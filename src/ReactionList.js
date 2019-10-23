import React, { useState } from 'react';
import AddReactionForm from './AddReactionForm';
import ScoreIcon from './ScoreIcon';

export default function ReactionList({ reactions, onAddReaction }) {
  const [formVisible, setFormVisible] = useState(false);

  function handleAddReaction(reaction) {
    onAddReaction(reaction);
    setFormVisible(false);
  }
  return (
    <>
      <ul>
        {reactions.map(reaction => (
          <li key={reaction.id}>
            {reaction.text} <ScoreIcon score={reaction.score} />
          </li>
        ))}
      </ul>
      <button onClick={() => setFormVisible(true)}>Add Reaction</button>
      {formVisible && <AddReactionForm onAddReaction={handleAddReaction} />}
    </>
  );
}
