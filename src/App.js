import React from 'react';
import Grid from '@material-ui/core/Grid';

function App() {
  return (
    <Grid container>
        <Grid item xs={6} style={{backgroundColor: 'green'}}>
            A
        </Grid>
        <Grid item xs={6} direction="row" justify="center" alignItems="center">
          <Grid item xs={12} style={{backgroundColor: 'red'}}>
            B
          </Grid>
          <Grid item xs={12} style={{backgroundColor: 'red'}}>
            C
          </Grid>
        </Grid>

    </Grid>
  );
}

export default App;
