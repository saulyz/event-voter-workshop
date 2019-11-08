import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import FeedbackList from './components/FeedbackList';
import Dashboard from './dashboard/Dashboard';
import VideoStream from './components/VideoStream';
import AddFeedbackForm from './components/AddFeedbackForm';
import PageControls from './layout/PageControls';
import * as feedbackStorage from './feedbackStorage';
import './App.css';
import PageBox from './layout/PageBox';

const EVENT_ID = 123;
const VIDEO_URL = 'https://www.youtube.com/embed/x7cQ3mrcKaY?controls=0';

function App() {
  const [feedbackFormVisible, setFeedbackFormVisible] = useState(false);
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    feedbackStorage.initialize();
    feedbackStorage.listenForListChanges(EVENT_ID, newList =>
      setFeedbackList(newList)
    );
  }, []);

  function addFeedback(feedback) {
    feedbackStorage.addFeedback(EVENT_ID, feedback);
    hideFeedbackForm();
  }

  function hideFeedbackForm() {
    setFeedbackFormVisible(false);
  }

  function showFeedbackForm() {
    setFeedbackFormVisible(true);
  }

  return (
    <>
      <CssBaseline />
      <div className="main-content">
        <div className="main-content__left">
          <PageBox>
            <FeedbackList feedbackList={feedbackList} />
          </PageBox>
        </div>
        <div className="main-content__right">
          <div className="right-side__section-1">
            <PageBox>
              <VideoStream videoUrl={VIDEO_URL} />
            </PageBox>
          </div>
          <div className="right-side__section-1">
            <PageBox>
              <Dashboard feedbackList={feedbackList} />
            </PageBox>
          </div>
        </div>
      </div>
      <PageControls onOpenFeedbackForm={showFeedbackForm} />
      {feedbackFormVisible && (
        <AddFeedbackForm
          onAddFeedback={addFeedback}
          onCancel={hideFeedbackForm}
        />
      )}
    </>
  );
}
export default App;
