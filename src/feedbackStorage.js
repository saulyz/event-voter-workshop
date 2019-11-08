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

const ITEMS_LIMIT = 50;

export function initialize() {
  firebase.initializeApp(firebaseConfig);
}
export function addFeedback(eventId, feedback) {
  const now = new Date();
  firebase
    .database()
    .ref(`events/${eventId}/feedback`)
    .push({
      ...feedback,
      datetime: now.toUTCString(),
      timestamp: now.getTime()
    });
}

export function listenForListChanges(eventId, onListChanged) {
  firebase
    .database()
    .ref(`/events/${eventId}/feedback`)
    .orderByChild('timestamp')
    .limitToLast(ITEMS_LIMIT)
    .on('value', function(snapshot) {
      const feedbackList = mapFirebaseToFeedbackList(snapshot);
      feedbackList.reverse();
      onListChanged(feedbackList);
    });
}

export function listenForScoreChanges(eventId, onLikeChanged, onDislikeChanged) {
  listenForCounterChanges(eventId, "like-count", onLikeChanged);
  listenForCounterChanges(eventId, "dislike-count", onDislikeChanged);
}

function listenForCounterChanges(eventId, counter, onCounterChange) {
  firebase
    .database()
    .ref(`/events/${eventId}/${counter}`)
    .on('value', function(snapshot) {
      if (!snapshot || !snapshot.val()) {
        onCounterChange(0);
      }
      onCounterChange(snapshot.val());
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
