import React, { useEffect, useState } from 'react';
// import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
// import actions
// import { getCurrentUser } from '../../actions/user';

// import components
import NavBar from '../../components/NavBar';
import Home from '../Home';
import Signup from '../Signup';
import Signin from '../Signin';
import Signout from '../Signout';

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
  const [loggedIn, setLoggedIn] = useState(false);

  const isAuth = useSelector(state => state.auth.authenticated);
  
useEffect(() => {
  if (isAuth) {
    setLoggedIn(true);
  } else setLoggedIn(false);
  return () => {
    //
  }
}, [isAuth]) 

  return (
    <div className={classes.root}>
      {console.log('loggedin', loggedIn)}
      {console.log('isAugh', isAuth)}
      <Grid className={classes.display}>
        <Grid item xs={12}>
          <NavBar isAuth={loggedIn}/>
        </Grid>
        <Switch>
          {/* Routed components  */}
          <Route exact path='/' component={Home} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/signout' component={Signout} />
          <Route exact path='/signin' component={Signin} />
        </Switch>
      </Grid>
    </div>
  )
}

export default App;
