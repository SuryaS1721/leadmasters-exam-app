import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  examId: { type: String, required: true },
  score: { type: Number, required: true },
  total: { type: Number, required: true },
  details: [{
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
    chosenIndex: Number,
    correctIndex: Number,
    isCorrect: Boolean
  }]
}, { timestamps: true });

export const Result = mongoose.model('Result', resultSchema);
