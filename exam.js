import { Router } from 'express';
import { Question } from '../models/Question.js';
import { Result } from '../models/Result.js';
import { auth } from '../middleware/auth.js';
import { config } from '../config.js';
import crypto from 'crypto';

const router = Router();

router.get('/start', auth, async (req, res) => {
  try {
    const count = await Question.countDocuments();
    const pick = Math.min(config.defaultQuestionCount, count);
    const pipeline = [{ $sample: { size: pick } }];
    const docs = await Question.aggregate(pipeline);

    const examId = crypto.randomBytes(8).toString('hex');
    const durationSeconds = config.defaultExamDurationMinutes * 60;

    // strip correctIndex before sending to client
    const questions = docs.map(q => ({
      _id: q._id,
      text: q.text,
      options: q.options
    }));

    return res.json({ examId, durationSeconds, questions });
  } catch (e) {
    return res.status(500).json({ message: 'Server error' });
  }
});

router.post('/submit', auth, async (req, res) => {
  try {
    const { examId, answers } = req.body; // answers: [{questionId, optionIndex}]
    if (!examId || !Array.isArray(answers)) {
      return res.status(400).json({ message: 'Invalid payload' });
    }

    const ids = answers.map(a => a.questionId);
    const qs = await Question.find({ _id: { $in: ids } });

    let correct = 0;
    const details = answers.map(a => {
      const q = qs.find(x => x._id.toString() === a.questionId);
      if (!q) return { questionId: a.questionId, chosenIndex: a.optionIndex, correctIndex: -1, isCorrect: false };
      const isCorrect = q.correctIndex === a.optionIndex;
      if (isCorrect) correct += 1;
      return { questionId: q._id, chosenIndex: a.optionIndex, correctIndex: q.correctIndex, isCorrect };
    });

    const total = answers.length;
    const score = correct;
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

    await Result.create({
      userId: req.user.sub,
      examId,
      score,
      total,
      details
    });

    return res.json({ score, total, correct, incorrect: total - correct, percentage });
  } catch (e) {
    return res.status(500).json({ message: 'Server error' });
  }
});

export default router;
