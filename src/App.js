import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import * as firebase from 'firebase';
import FeedbackList from './components/FeedbackList';
import Dashboard from './dashboard/Dashboard';
import VideoStream from './components/VideoStream';
import AddFeedbackForm from './AddFeedbackForm';
import PageControls from './layout/PageControls';
import './App.css';

const firebaseConfig = {
  apiKey: 'AIzaSyDlmqcy_Wwwjiggko1y5YlSX8cWFRMXbks',
  authDomain: 'we-can-code-2019.firebaseapp.com',
  databaseURL: 'https://we-can-code-2019.firebaseio.com',
  projectId: 'we-can-code-2019',
  storageBucket: 'we-can-code-2019.appspot.com',
  messagingSenderId: '33900536726',
  appId: '1:33900536726:web:d7fd5cc94c26370440f3b7'
};

function App() {
  const [feedbackFormVisible, setFeedbackFormVisible] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    firebase.initializeApp(firebaseConfig);
    setInitialized(true);
  }, [setInitialized]);

  useEffect(() => {
    if (initialized) {
      firebase
        .database()
        .ref('/feedback/')
        .on('value', function(snapshot) {
          const feedbackList = mapFirebaseToFeedbackList(snapshot);
          setFeedbackList(feedbackList);
        });
    }
  }, [initialized]);

  function hideFeedbackForm() {
    setFeedbackFormVisible(false);
  }

  function addFeedback(feedback) {
    let now = new Date();
    let userId = now.getTime();
    firebase
      .database()
      .ref('feedback/' + userId)
      .set({
        ...feedback,
        datetime: now.toUTCString()
      });
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

function mapFirebaseToFeedbackList(snapshot) {
  return Object.entries(snapshot.val())
    .map(([id, feedback]) => ({ id, ...feedback }))
    .sort((a, b) => Date.parse(b.datetime) - Date.parse(a.datetime));
}

export default App;
