import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
// import actions
import { getCurrentUser } from '../../actions/user';

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
  const dispatch = useDispatch();

  const [user, setUser ] = useState();
  const currentUser = useSelector(state => state.currentUser.getUserData);
  useEffect(() => {
    console.log('in useEffect', currentUser);
    if(!user || user?.firstName === undefined) {
      dispatch(getCurrentUser()) && setUser(currentUser);
    }
    return () => {
      //
    }
  }, [currentUser, user])
// dispatch(getCurrentUser());
  // const mounted = useRef();


  // useEffect(() => {
  //   if(!mounted.current) {
  //     dispatch(getCurrentUser());
  //     setUser(currentUser);
  //     mounted.current = true;
  //   } else {
  //     if(user !== undefined) {
  //       dispatch(getCurrentUser());
  //       setUser(currentUser);
  //     }
  //   }
  // }, [currentUser, dispatch, user])
  // useEffect(() => {
   
  //   dispatch(getCurrentUser());
  //   setUser(currentUser);
  //   return () => {
  //     //
  //   }
  // }, [currentUser, dispatch]);

  return (
    <div className={classes.root}>
      {console.log('user in home', user)}
      <Grid className={classes.display}>
        <Grid item xs={12}>
          <NavBar user={user}/>
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
