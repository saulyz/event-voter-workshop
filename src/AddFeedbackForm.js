import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red, green } from '@material-ui/core/colors';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import './AddFeedbackForm.css';

const useStyles = makeStyles(() => ({
  ratingUpActive: {
    color: green[900],
    backgroundColor: green[200]
  },
  ratingDownActive: {
    color: red[900],
    backgroundColor: red[200]
  }
}));

export default function AddFeedbackForm({ onAddFeedback, onCancel }) {
  const classes = useStyles();
  const [text, setText] = useState('');
  const [score, setScore] = useState(null);

  function handleFormSubmit() {
    onAddFeedback({
      text,
      score,
      id: Math.random()
    });
  }

  function handleClickLike() {
    setScore(10);
  }

  function handleClickDislike() {
    setScore(1);
  }

  return (
    <>
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
              className={score && score > 5 ? classes.ratingUpActive : ''}
              aria-label="Like"
              onClick={handleClickLike}
            >
              <ThumbUpIcon />
            </IconButton>
            <IconButton
              className={score && score <= 5 ? classes.ratingDownActive : ''}
              aria-label="Dislike"
              onClick={handleClickDislike}
            >
              <ThumbDownIcon />
            </IconButton>
          </div>
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
    </>
  );
}
