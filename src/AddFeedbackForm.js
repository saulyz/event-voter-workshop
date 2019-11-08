import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

export default function AddFeedbackForm({ onAddFeedback, onCancel }) {
  const [text, setText] = useState('');
  const [score, setScore] = useState(null);
  const [name, setName] = useState('Anonymous');

  function handleFormSubmit() {
    onAddFeedback({
      text,
      score,
      name,
      id: Math.random()
    });
  }

  function handleClickLike() {
    setScore(10);
  }

  function handleClickDislike() {
    setScore(1);
  }

  const likeClicked = score && score >= 5;
  const dislikeClicked = score && score < 5;
  return (
    <Dialog
      open
      onClose={onCancel}
      aria-labelledby="form-dialog-title"
      maxWidth="sm"
      fullWidth={true}
    >
      <DialogTitle id="form-dialog-title">Add Feedback</DialogTitle>
      <DialogContent>
        <div>
          <IconButton
            color={likeClicked ? 'primary' : undefined}
            aria-label="Like"
            onClick={handleClickLike}
          >
            <ThumbUpIcon />
          </IconButton>
          <IconButton
            color={dislikeClicked ? 'primary' : undefined}
            aria-label="Dislike"
            onClick={handleClickDislike}
          >
            <ThumbDownIcon />
          </IconButton>
        </div>
        <TextField
          id="feedback-text"
          label="Name"
          fullWidth
          margin="normal"
          onChange={e => setName(e.target.value)}
        />
        <TextField
          id="feedback-text"
          label="Your comments"
          placeholder="Can add multiline text here"
          multiline
          fullWidth
          margin="normal"
          helperText="comments are optional"
          onChange={e => setText(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="default">
          Cancel
        </Button>
        <Button
          onClick={handleFormSubmit}
          color="primary"
          variant="contained"
          disabled={score == null}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
