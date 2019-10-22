import React from 'react';
import Grid from '@material-ui/core/Grid';

function App() {
  return (
    <Grid container>
        <Grid item xs={6}>
            A
        </Grid>
        <Grid item xs={6}>
            B
        </Grid>
        <Grid item xs={12}>
            C
        </Grid>
    </Grid>
  );
}

export default App;
