import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import FeedbackList from './FeedbackList';
import Dashboard from './Dashboard';
import VideoStream from './VideoStream';
import AddFeedbackForm from './AddFeedbackForm';

import './App.css';

function App() {
  const [feedbackList, setFeedbackList] = useState([
    {
      text: 'Very nais',
      score: 10,
      id: 1
    }
  ]);

  function addFeedback(feedback) {
    setFeedbackList(previousList => [feedback, ...previousList]);
  }

  return (
    <>
      <CssBaseline />
      <div className="root">
        <div className="left1">
          <FeedbackList feedbackList={feedbackList} />
        </div>
        <div className="right1">
          <div className="right1_1">
            <VideoStream />
          </div>
          <div className="right1_2">
            <Dashboard feedbackList={feedbackList} />
          </div>
        </div>
      </div>
      <AddFeedbackForm onAddFeedback={addFeedback} />
    </>
  );
}

export default App;
