import React from 'react';

export default function ScoreIcon({ score }) {
  if (!score) {
    return null;
  }
  if (score > 5) {
    return <span role="image">👍</span>;
  } else {
    return <span role="image">👎</span>;
  }
}
