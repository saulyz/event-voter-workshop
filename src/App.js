import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import ReactionList from './ReactionList';
import Dashboard from './Dashboard';
import VideoStream from './VideoStream';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    height: '100vh',
    width: '100vw',
    display: 'flex'
  },
  left1: {
    height: '100%',
    width: '50%',
    backgroundColor: 'red',
    overflow: 'scroll'
  },
  right1: {
    height: '100%',
    width: '50%'
  },
  right1_1: {
    height: '50%',
    width: '100%',
    backgroundColor: 'blue',
    overflow: 'scroll'
  },
  right1_2: {
    height: '50%',
    width: '100%',
    backgroundColor: 'green'
  }
});

function App() {
  const classes = useStyles();
  const [reactions, setReactions] = useState([]);

  function addReaction(reaction) {
    setReactions(previousReaction => [reaction, ...previousReaction]);
  }

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <div className={classes.left1}>
          <ReactionList reactions={reactions} onAddReaction={addReaction} />
        </div>
        <div className={classes.right1}>
          <div className={classes.right1_1}>
            <VideoStream />
          </div>
          <div className={classes.right1_2}>
            <Dashboard reactions={reactions} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
