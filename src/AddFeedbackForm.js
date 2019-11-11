import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

const DEFAULT_NAME = 'Anonymous';
const NAME_STORAGE_KEY = 'author_name';

export default function AddFeedbackForm({
  onAddFeedback,
  onCancel,
  initialValues = {}
}) {
  const [name, setName] = useState(initialValues.name || '');
  const [score, setScore] = useState(initialValues.score);
  const [text, setText] = useState(initialValues.text || '');

  useEffect(() => {
    const name = localStorage.getItem(NAME_STORAGE_KEY);
    if (name) {
      setName(name);
    }
  }, [setName]);

  function handleFormSubmit() {
    onAddFeedback({
      name: name || DEFAULT_NAME,
      score,
      text
    });
    if (name) {
      localStorage.setItem(NAME_STORAGE_KEY, name);
    }
  }

  function handleClickLike() {
    setScore(1);
  }

  function handleClickDislike() {
    setScore(-1);
  }

  const likeClicked = score && score >= 0;
  const dislikeClicked = score && score < 0;
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
          value={name}
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
