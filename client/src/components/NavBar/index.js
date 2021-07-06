import React from 'react';
// import Link from react-router-dom
import {
  AppBar,
  Toolbar,
  IconButton,
  FormControlLabel,
  FormGroup,
  Typography,
  Menu,
  MenuItem,
  Switch as ToggleSwitch,
} from '@material-ui/core';
// import { MenuIcon, AccountCircle } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';

// import signout button
const location = () => window.location.pathname === '/'
  ? 'Dashboard'
  : window.location.pathname.split('/').reverse().join(' ');

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function NavBar({ user }) {

  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorE1, setAnchorE1] = React.useState(null);
  const open = Boolean(anchorE1);

  const handleChange = (e) => {
    setAuth(e.target.checked);
  };

  const handleMenu = (e) => {
    setAnchorE1(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorE1(null);
  };

  return (
    <>
      <div className={classes.root}>
        <FormGroup>
          <FormControlLabel
            control={<ToggleSwitch checked={auth} onChange={handleChange} aria-label='login switch' />}
            label={auth ? 'Logout' : 'Login'}
          />
        </FormGroup>
        <AppBar position='static'>
          <Toolbar>
            <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='menu'>
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              Lists
          </Typography>

            {auth && (
              <div>
                <IconButton
                  aria-label='account of current user'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  onClick={handleMenu}
                  color='inherit'
                >
                  <AccountCircle />
                </IconButton>
              </div>
            )}

          </Toolbar>
        </AppBar>
      </div>
    </>
  )
};

export default NavBar();
