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
  const [formValues, replaceFormValues] = useState(initialValues);
  const { score } = formValues;

  function updateForm(newFormValues) {
    replaceFormValues(previousFormValues => ({
      ...previousFormValues,
      ...newFormValues
    }));
  }

  useEffect(() => {
    const name = localStorage.getItem(NAME_STORAGE_KEY);
    if (name) {
      replaceFormValues({ ...formValues, name: name });
    }
  }, [replaceFormValues]);

  function handleFormSubmit() {
    onAddFeedback({
      ...formValues,
      name: formValues.name || DEFAULT_NAME
    });
    if (formValues.name) {
      localStorage.setItem(NAME_STORAGE_KEY, formValues.name);
    }
  }

  function handleClickLike() {
    updateForm({ score: 1 });
  }

  function handleClickDislike() {
    updateForm({ score: -1 });
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
          value={formValues.name}
          onChange={e => updateForm({ name: e.target.value })}
        />
        <TextField
          id="feedback-text"
          label="Your comments"
          placeholder="Can add multiline text here"
          multiline
          fullWidth
          margin="normal"
          helperText="comments are optional"
          onChange={e => updateForm({ text: e.target.value })}
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
