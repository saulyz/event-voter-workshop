import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import FeedbackList from './components/FeedbackList';
import Dashboard from './dashboard/Dashboard';
import VideoStream from './components/VideoStream';
import AddFeedbackForm from './AddFeedbackForm';
import PageControls from './layout/PageControls';
import * as feedbackStorage from './feedbackStorage';
import './App.css';
import PageBox from './layout/PageBox';

const DEFAULT_EVENT_ID = 'x7cQ3mrcKaY';

function App() {
  const [feedbackFormVisible, setFeedbackFormVisible] = useState(false);
  const [feedbackList, setFeedbackList] = useState([]);
  const [eventId, setEventId] = useState(DEFAULT_EVENT_ID);
  const [initialFormValues, setInitialFormValues] = useState({});
  const [score, setScore] = useState({ dislikeCount: 0, likeCount: 0 });

  useEffect(() => {
    feedbackStorage.initialize();
    const pathEventId = window.location.pathname.replace('/', '');
    if (pathEventId) {
      setEventId(pathEventId);
    }
  }, []);

  useEffect(() => {
    feedbackStorage.listenForListChanges(eventId, newList =>
      setFeedbackList(newList)
    );
    feedbackStorage.listenForScoreChanges(eventId, newScore => setScore(newScore));
  }, [eventId]);

  function addFeedback(feedback) {
    feedbackStorage.addFeedback(eventId, feedback);
    hideFeedbackForm();
  }

  function hideFeedbackForm() {
    setFeedbackFormVisible(false);
  }

  function showFeedbackForm(initialValues = {}) {
    setInitialFormValues(initialValues);
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
              <VideoStream
                videoUrl={`https://www.youtube.com/embed/${eventId}?controls=0`}
              />
            </PageBox>
          </div>
          <div className="right-side__section-1">
            <PageBox>
              <Dashboard
                onLikeClick={() => showFeedbackForm({ score: 1 })}
                onDislikeClick={() => showFeedbackForm({ score: -1 })}
                score={score}
              />
            </PageBox>
          </div>
        </div>
      </div>
      <PageControls onOpenFeedbackForm={() => showFeedbackForm()} />
      {feedbackFormVisible && (
        <AddFeedbackForm
          onAddFeedback={addFeedback}
          onCancel={hideFeedbackForm}
          initialValues={initialFormValues}
        />
      )}
    </>
  );
}
export default App;
