import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { Grid, Button, Typography } from '@material-ui/core';

import { signOut } from '../../actions/auth';

const Signout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(signOut());
    return () => {
      //
    }
  }, []);

  return (
    <Grid>
      <Typography as='h1' variant='h4'>
        See you next time
      </Typography>
      <Button 
      component={Link}
      to='/signin' 
      variant='contained'
       >Go back to sign in</Button>
    </Grid>
  )
}

export default Signout;
