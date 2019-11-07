import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import FeedbackList from './FeedbackList';
import Dashboard from './Dashboard';
import VideoStream from './VideoStream';
import AddFeedbackForm from './AddFeedbackForm';
import PageControls from './PageControls';
import './App.css';

function App() {
  const [feedbackFormVisible, setFeedbackFormVisible] = useState(false);
  const [feedbackList, setFeedbackList] = useState([
    {
      text: 'Very nais',
      score: 10,
      id: 1
    }
  ]);

  function hideFeedbackForm() {
    setFeedbackFormVisible(false);
  }

  function addFeedback(feedback) {
    setFeedbackList(previousList => [feedback, ...previousList]);
    hideFeedbackForm();
  }

  return (
    <>
      <CssBaseline />
      <div className="root">
        <div className="left1">
          <PageBox>
            <FeedbackList feedbackList={feedbackList} />
          </PageBox>
        </div>
        <div className="right1">
          <div className="right1_1">
            <PageBox>
              <VideoStream />
            </PageBox>
          </div>
          <div className="right1_2">
            <PageBox>
              <Dashboard feedbackList={feedbackList} />
            </PageBox>
          </div>
        </div>
      </div>
      <PageControls onOpenFeedbackForm={() => setFeedbackFormVisible(true)} />
      {feedbackFormVisible && (
        <AddFeedbackForm
          onAddFeedback={addFeedback}
          onCancel={hideFeedbackForm}
        />
      )}
    </>
  );
}

function PageBox({ children }) {
  return (
    <div className="page-box">
      <div className="page-box__content">{children}</div>
    </div>
  );
}

export default App;
