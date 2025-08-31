import React from 'react';
import { Link } from 'react-router-dom';

export default function Result() {
  const data = JSON.parse(sessionStorage.getItem('exam_result') || '{}');
  if (!data?.total) {
    return <div><p>No result found.</p><Link to="/">Go to exam</Link></div>;
  }
  return (
    <div>
      <h3>Result</h3>
      <p><strong>Score:</strong> {data.score} / {data.total}</p>
      <p><strong>Correct:</strong> {data.correct}</p>
      <p><strong>Incorrect:</strong> {data.incorrect}</p>
      <p><strong>Percentage:</strong> {data.percentage}%</p>
      <Link to="/">Take again</Link>
    </div>
  );
}
