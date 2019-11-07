import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import * as firebase from 'firebase';
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

  const firebaseConfig = {
    apiKey: "AIzaSyDlmqcy_Wwwjiggko1y5YlSX8cWFRMXbks",
    authDomain: "we-can-code-2019.firebaseapp.com",
    databaseURL: "https://we-can-code-2019.firebaseio.com",
    projectId: "we-can-code-2019",
    storageBucket: "we-can-code-2019.appspot.com",
    messagingSenderId: "33900536726",
    appId: "1:33900536726:web:d7fd5cc94c26370440f3b7"
  };
  const app = firebase.initializeApp(firebaseConfig);

  /*
  var participants = firebase.database().ref('/feedback/').once('value').then(function(snapshot) {
    console.log(snapshot.val()); // (snapshot.val() && snapshot.val().username) || 'Anonymous';

  });
   */

  /*
  function writeUserData(name, rating) {
  let now = new Date();
  let userId = now.getTime();
  firebase.database().ref('feedback/' + userId).set({
    name: name,
    datetime: now.getFullYear() + "-" + now.getMonth() + "-" + now.getDay() + " " + now.getHours() + ":" + now.getMinutes();,
    rating : rating
  });
}
   */

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
