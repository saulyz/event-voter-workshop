import * as firebase from 'firebase';

const firebaseConfig = require('./config.json');

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

export function listenForScoreChanges(eventId, onScoreChanged) {
  firebase
    .database()
    .ref(`/events/${eventId}/score`)
    .on('value', function(snapshot) {
      if (!snapshot || !snapshot.val()) {
        onScoreChanged({ dislikeCount: 0, likeCount: 0 });
      }
      onScoreChanged(snapshot.val());
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
