import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red, green } from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import './AddFeedback.css';

const useStyles = makeStyles(() => ({
  fab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed'
  },
  ratingUpActive: {
    color: green[900],
    backgroundColor: green[200]
  },
  ratingDownActive: {
    color: red[900],
    backgroundColor: red[200]
  }
}));

export default function AddFeedbackForm({ onAddFeedback }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const [score, setScore] = useState(null);

  function handleFormSubmit() {
    onAddFeedback({
      text,
      score,
      id: Math.random()
    });
    handleClose();
  }

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function handleClickLike() {
    setScore(10);
  }

  function handleClickDislike() {
    setScore(1);
  }

  return (
    <div>
      <Fab
        className={classes.fab}
        color="primary"
        aria-label="add"
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
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
          <Button onClick={handleClose} color="default">
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
    </div>
  );
}
