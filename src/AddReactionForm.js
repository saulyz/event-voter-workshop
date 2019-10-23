import React, { useState } from 'react';
import ScoreIcon from './ScoreIcon';

export default function AddReactionForm({ onAddReaction }) {
  const [text, setText] = useState('');
  const [score, setScore] = useState(null);

  function handleFormSubmit(event) {
    if (event) {
      event.preventDefault();
    }
    onAddReaction({
      text,
      score,
      id: Math.random()
    });
  }

  return (
    <div>
      <form
        onSubmit={handleFormSubmit}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <textarea
          value={text}
          onChange={event => setText(event.target.value)}
        />
        <button
          type="button"
          style={{ fontSize: 16 }}
          onClick={() => setScore(10)}
        >
          <ScoreIcon score={10} />
        </button>
        <button
          type="button"
          style={{ fontSize: 16 }}
          onClick={() => setScore(1)}
        >
          <ScoreIcon score={1} />
        </button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
