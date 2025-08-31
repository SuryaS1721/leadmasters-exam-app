import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import Timer from '../components/Timer';

export default function Exam() {
  const [state, setState] = useState({ examId: '', durationSeconds: 0, questions: [] });
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({}); // {questionId: optionIndex}
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function start() {
      try {
        const { data } = await api.get('/exam/start');
        setState(data);
      } catch (e) {
        // if unauthorized
      } finally {
        setLoading(false);
      }
    }
    start();
  }, []);

  function choose(questionId, optionIndex) {
    setAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  }

  function next() {
    setIdx(i => Math.min(i + 1, state.questions.length - 1));
  }

  function prev() {
    setIdx(i => Math.max(i - 1, 0));
  }

  async function submit() {
    const payload = {
      examId: state.examId,
      answers: Object.entries(answers).map(([questionId, optionIndex]) => ({ questionId, optionIndex }))
    };
    const { data } = await api.post('/exam/submit', payload);
    sessionStorage.setItem('exam_result', JSON.stringify(data));
    navigate('/result');
  }

  if (loading) return <p>Loading...</p>;
  if (!state.questions.length) return <p>No questions available. Please seed the DB and retry.</p>;

  const q = state.questions[idx];
  const chosen = answers[q._id];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3>Exam</h3>
        <Timer seconds={state.durationSeconds} onExpire={submit} />
      </div>

      <div style={{ padding: 16, border: '1px solid #ddd', borderRadius: 8, marginBottom: 12 }}>
        <p><strong>Q{idx + 1}.</strong> {q.text}</p>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {q.options.map((opt, i) => (
            <li key={i} style={{ marginBottom: 8 }}>
              <label style={{ cursor: 'pointer' }}>
                <input
                  type="radio"
                  name={q._id}
                  checked={chosen === i}
                  onChange={() => choose(q._id, i)}
                  style={{ marginRight: 8 }}
                />
                {opt}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={prev} disabled={idx === 0}>Previous</button>
        <button onClick={next} disabled={idx === state.questions.length - 1}>Next</button>
        <button onClick={submit} style={{ marginLeft: 'auto' }}>Submit</button>
      </div>

      <div style={{ marginTop: 12 }}>
        {state.questions.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            style={{ marginRight: 4, background: i === idx ? '#ddd' : '#f5f5f5' }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
