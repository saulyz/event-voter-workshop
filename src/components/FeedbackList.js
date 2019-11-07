import React  from 'react';
import ScoreIcon from './ScoreIcon';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';

import './FeedbackList.css';

export default function FeedbackList({ feedbackList }) {
  return (
    <List>
      {feedbackList.map(feedback => (
        <ListItem key={feedback.id} className="feedback-list__item">
          <ListItemAvatar>
            <Avatar>
              <ScoreIcon score={feedback.score} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={feedback.name}
            secondary={<> {feedback.datetime} {feedback.text}</>}
          />
        </ListItem>
      ))}
    </List>
  );
}
