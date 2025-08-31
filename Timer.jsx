import React, { useEffect, useState } from 'react';

export default function Timer({ seconds, onExpire }) {
  const [time, setTime] = useState(seconds);

  useEffect(() => {
    setTime(seconds);
  }, [seconds]);

  useEffect(() => {
    if (time <= 0) {
      onExpire?.();
      return;
    }
    const id = setTimeout(() => setTime(t => t - 1), 1000);
    return () => clearTimeout(id);
  }, [time, onExpire]);

  const mm = String(Math.floor(time / 60)).padStart(2, '0');
  const ss = String(time % 60).padStart(2, '0');

  return <div style={{ fontWeight: 600 }}>Time Left: {mm}:{ss}</div>;
}
