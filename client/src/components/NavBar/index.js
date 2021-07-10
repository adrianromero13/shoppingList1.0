import React from 'react';
import { useHistory } from 'react-router';
import Switch from '@material-ui/core/Switch';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar({user}) {

  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState(0);

  const history = useHistory();
  console.log('user in navbar', user);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  }
  const open = Boolean(anchorEl);

  const handleAuthChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    // if(selected === 'signup') {
    //   history.push('/signup');
    // } else if (selected === 'signout') {
    //   history.push('/signout');
    // }
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton 
          edge="start" 
          className={classes.menuButton} 
          color="inherit" 
          aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Title of List Type
            {/* <NavButtons value={value} handleChange={handleTabChange}/> */}

          </Typography>
          {auth && (
            <div>
              {user?.firstName !== undefined && user ? `Hello ${user?.firstName} ${user?.lastName}` : 'Welcome To ShoppersList' }
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={() => history.push('/') && handleClose}>Home</MenuItem>
                <MenuItem onClick={() => history.push('/signout') && handleClose}>Signout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}