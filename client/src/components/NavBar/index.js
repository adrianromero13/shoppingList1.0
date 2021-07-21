import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  MenuItem,
  Menu,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

import { getCurrentUser } from '../../actions/user';
import CreateListModal from '../../containers/ListModal';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'inline',
    alignItems: 'center',

  },
  title: {
    flexGrow: 1,
    justifyContent: 'center',
  },
}));

export default function NavBar({ isAuth }) {
  const classes = useStyles();
  const history = useHistory();

  const user = useSelector(state => state.currentUser.getUserData);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      await dispatch(getCurrentUser());
    }

    fetchUser();
  }, [dispatch]);

  const handleMenuOption = () => {
    setOpen(true);
  }
  const handleModalClose = () => {
    setOpen(false);
  }

  const handleRedirect = (location, popupState) => {
    if (location === 'signin') {
      history.push('/signin');
    } else if (location === 'signup') {
      history.push('/signup');
    } else history.push('/signout');
    popupState.close();
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {isAuth && <PopupState variant='popover' popupId='list-popup-menu'>
            {(popupState) => (
              <>
                <MenuIcon {...bindTrigger(popupState)} />
                <Menu {...bindMenu(popupState)}>
                  <MenuItem onClick={() => handleMenuOption(popupState)}>Create New List</MenuItem>
                  <CreateListModal open={open} close={handleModalClose} popupState={popupState} />
                </Menu>
              </>
            )}
          </PopupState>
          }

          <Typography
            align='center'
            variant='h6'
            className={classes.title}
          >
            {isAuth ?
              `Hello ${user?.firstName} ${user?.lastName}`
              :
              'Welcome To ShoppersList'}
          </Typography>
          {user && (
            <div>
              <PopupState variant='popover' popupId='user-popup-menu'>
                {(popupState) => (
                  <>
                    <AccountCircle {...bindTrigger(popupState)} />
                    <Menu {...bindMenu(popupState)}>
                      {isAuth ?
                        <MenuItem
                          onClick={() => handleRedirect('signout', popupState)}
                        >Sign Out</MenuItem>
                        :
                        [
                          <MenuItem
                            onClick={() => handleRedirect('signin', popupState)}
                          >Sign In</MenuItem>,
                          <MenuItem
                            onClick={() => handleRedirect('signup', popupState)}
                          >Sign Up</MenuItem>
                        ]
                      }
                    </Menu>
                  </>
                )}
              </PopupState>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
