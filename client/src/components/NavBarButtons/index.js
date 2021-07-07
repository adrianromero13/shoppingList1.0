import React from 'react';
import { ButtonGroup, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
// import SignOutButton from '../SignOutButton'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));
const location = () => window.location.pathname === '/' 
? 'Dashboard'
: window.location.pathname.split('/').reverse().join(' ');

export default function NavButtons() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    {/* <ButtonGroup
    disableElevation
    variant='contained'
    color='primary'
    aria-label='contained primary button group'
    > */}
      <Button variant='contained' color='primary'>one</Button>
      <Button variant='contained' color='primary'>two</Button>
      <Button variant='contained' color='primary'>three</Button>
    {/* </ButtonGroup> */}
    </div>
  )
};
