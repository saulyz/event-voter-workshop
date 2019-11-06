import React from 'react';
export default function Dashboard({ reactions }) {
  const validScores = reactions.filter(r => r.score).map(r => r.score);

  const scoreSum = validScores.reduce((a, b) => a + b, 0);
  const averageScore = validScores.length ? scoreSum / validScores.length : 0;
  return <div>Average Score: {averageScore}</div>;
}
