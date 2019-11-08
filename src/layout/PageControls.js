import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import './PageControls.css';

export default function PageControls({ onOpenFeedbackForm }) {
  return (
    <div className="page-controls">
      <Fab color="primary" aria-label="add" onClick={onOpenFeedbackForm}>
        <AddIcon />
      </Fab>
    </div>
  );
}
