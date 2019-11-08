import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDlmqcy_Wwwjiggko1y5YlSX8cWFRMXbks',
  authDomain: 'we-can-code-2019.firebaseapp.com',
  databaseURL: 'https://we-can-code-2019.firebaseio.com',
  projectId: 'we-can-code-2019',
  storageBucket: 'we-can-code-2019.appspot.com',
  messagingSenderId: '33900536726',
  appId: '1:33900536726:web:d7fd5cc94c26370440f3b7'
};
export function initialize() {
  firebase.initializeApp(firebaseConfig);
}
export function addFeedback(eventId, feedback) {
  const now = new Date();
  firebase
    .database()
    .ref(`event-feedback-list/${eventId}`)
    .push({
      ...feedback,
      datetime: now.toUTCString(),
      timestamp: now.getTime()
    });
}

export function listenForListChanges(eventId, onListChanged) {
  firebase
    .database()
    .ref(`/event-feedback-list/${eventId}`)
    .orderByChild('starCount')
    .on('value', function(snapshot) {
      const feedbackList = mapFirebaseToFeedbackList(snapshot);
      onListChanged(feedbackList);
    });
}

function mapFirebaseToFeedbackList(snapshot) {
  if (!snapshot || !snapshot.val()) {
    return [];
  }
  const list = [];
  snapshot.forEach(item => {
    list.push({ id: item.key, ...item.val() });
  });

  return list;
}
