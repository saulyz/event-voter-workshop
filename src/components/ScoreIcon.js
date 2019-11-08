import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import { makeStyles } from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';

const useStyles = makeStyles(() => ({
  scoreIconUp: {
    backgroundColor: green[200]
  },
  scoreIconDown: {
    backgroundColor: red[200]
  }
}));

export default function ScoreIcon({ score, onClick }) {
  const classes = useStyles();
  if (!score) {
    return null;
  }
  if (score >= 0) {
    return (
      <Avatar className={classes.scoreIconUp} variant="rounded" onClick={onClick}>
        <ThumbUpIcon />
      </Avatar>
    );
  } else {
    return (
      <Avatar className={classes.scoreIconDown} variant="rounded" onClick={onClick}>
        <ThumbDownIcon />
      </Avatar>
    );
  }
}
