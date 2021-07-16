import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { getCurrentUser } from '../../actions/user';
// import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

  },
  title: {
    flexGrow: 1,
  },
}));

function MenuContainer(props) {
  const { children, id, button } = props;

  return (
    <PopupState variant='popover' popupId={id}>
      {(popupState) => (
        <>
          {button}
        </>
      )}
    </PopupState>
    // <Menu
    //   id="menu-appbar"
    //   anchorE1={anchor}
    //   anchorOrigin={{
    //     vertical: 'top',
    //     horizontal: 'right',
    //   }}
    //   keepMounted
    //   transformOrigin={{
    //     vertical: 'top',
    //     horizontal: 'right',
    //   }}
    //   open={openMenu}
    //   onClose={onClose}
    // >
    //   {children}
    // </Menu>
  )
}

export default function NavBar({ isAuth }) {
  const classes = useStyles();
  const history = useHistory();

  // const [anchorEl, setAnchorEl] = useState(null);

  const user = useSelector(state => state.currentUser.getUserData);

  //  const handleOpen = (event) => {
  //    setAnchorEl(event.currentTarget);
  //  }

  //   const handleClose = () => {
  //   //  setAnchor({anchor1: null, anchor2: null})
  //   setAnchorEl(null);
  //   };

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      await dispatch(getCurrentUser());
    }

    fetchUser();
  }, []);

  const handleClose = (popupState) => {
    alert('clicked');
    popupState.close();
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="list menu"
            aria-haspopup='true'
            onClick={handleOpen}
          > */}

          <PopupState variant='popover' popupId='list-popup-menu'>
            {(popupState) => (
              <>
                <MenuIcon {...bindTrigger(popupState)}/>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem onClick={() => handleClose(popupState)}>Hello</MenuItem>
                </Menu>
              </>
            )}
          </PopupState>


          {/* <MenuContainer anchor={anchor?.anchor2} openMenu={openListMenu} onClose={handleClose}> */}
          {/* </IconButton> */}

          <Typography variant='h6' className={classes.title}>
            Title of List Type
          </Typography>
          {user && (
            <div>
              {isAuth ? `Hello ${user?.firstName} ${user?.lastName}` : 'Welcome To ShoppersList'}


              <PopupState variant='popover' popupId='user-popup-menu'>
            {(popupState) => (
              <>
                <AccountCircle {...bindTrigger(popupState)}/>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem onClick={() => history.push('/signout') && popupState.close}>Signout</MenuItem>
                </Menu>
              </>
            )}
          </PopupState>
              {/* <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpen}
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
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => history.push('/') && handleClose}>Home</MenuItem>
                <MenuItem onClick={() => history.push('/signout') && handleClose}>Signout</MenuItem>
              </Menu> */}
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
