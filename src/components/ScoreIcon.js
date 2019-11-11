import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

export default function ScoreIcon({ score, onClick }) {
  if (!score) {
    return null;
  }
  if (score >= 0) {
    return (
      <Avatar
        variant="rounded"
        onClick={onClick}
        style={{ backgroundColor: '#a5d6a7' }}
      >
        <ThumbUpIcon />
      </Avatar>
    );
  } else {
    return (
      <Avatar
        variant="rounded"
        onClick={onClick}
        style={{ backgroundColor: '#ef9a9a' }}
      >
        <ThumbDownIcon />
      </Avatar>
    );
  }
}
