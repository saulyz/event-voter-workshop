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

export default function ScoreIcon({ score }) {
  const classes = useStyles();
  if (!score) {
    return null;
  }
  if (score >= 5) {
    return (
      <Avatar className={classes.scoreIconUp} variant="rounded">
        <ThumbUpIcon />
      </Avatar>
    );
  } else {
    return (
      <Avatar className={classes.scoreIconDown} variant="rounded">
        <ThumbDownIcon />
      </Avatar>
    );
  }
}
