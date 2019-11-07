import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red, green } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import RemoveIcon from '@material-ui/icons/Remove';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: '20px'
  },
  box: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scoreIconUp: {
    backgroundColor: green[200]
  },
  scoreIconDown: {
    backgroundColor: red[200]
  },
  scoreboardItem: {
    margin: '0 10px'
  }
}));

export default function ScoreDashboardItem({ likes, dislikes }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box className={classes.box}>
        <div>
          <Typography
            className={classes.scoreboardItem}
            component="span"
            variant="h4"
          >
            {likes || 0}
          </Typography>
        </div>
        <Avatar className={classes.scoreIconUp} variant="rounded">
          <ThumbUpIcon />
        </Avatar>
      </Box>
      <Box className={classes.scoreboardItem}>
        <RemoveIcon />
      </Box>
      <Box className={classes.box}>
        <Avatar className={classes.scoreIconDown} variant="rounded">
          <ThumbDownIcon />
        </Avatar>
        <Typography
          className={classes.scoreboardItem}
          component="span"
          variant="h4"
        >
          {dislikes || 0}
        </Typography>
      </Box>
    </div>
  );
}
