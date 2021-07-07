import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

// import components

import NavBar from '../../components/NavBar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  display: {
    maxWidth: 700,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  }
}));

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid 
      // container 
      // direction='column'
      // justifyContent='center'
      // alignItems='center'
      // wrap='nowrap' 
      // spacing={0}
      className={classes.display}
      >
        <Grid item xs={12}>

        <NavBar />
  
        </Grid>
        <Switch>
          {/* Routed components  */}

        </Switch>
      </Grid>
    </div>
  )
}

export default App;
