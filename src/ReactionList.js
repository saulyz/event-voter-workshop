import React, { useState } from 'react';
import AddReactionForm from './AddReactionForm';
import ScoreIcon from './ScoreIcon';
import { Dialog, Button } from '@material-ui/core';

export default function ReactionList({ reactions, onAddReaction }) {
  const [formVisible, setFormVisible] = useState(false);

  function handleAddReaction(reaction) {
    onAddReaction(reaction);
    closeForm();
  }
  function closeForm() {
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
      <Button
        variant="contained"
        color="primary"
        onClick={() => setFormVisible(true)}
      >
        Add Reaction
      </Button>

      <Dialog onClose={closeForm} open={formVisible}>
        <AddReactionForm onAddReaction={handleAddReaction} />
      </Dialog>
    </>
  );
}
