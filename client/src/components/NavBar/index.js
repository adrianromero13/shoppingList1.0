import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { getCurrentUser } from '../../actions/user';
// import Button from '@material-ui/core/Button';
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
  }, []);

  const handleMenuOption = (popupState) => {
    setOpen(true);
    // handleModalClose(popupState);
    // popupState.close();
  }
  const handleModalClose = () => {
    setOpen(false);
  }
  // const handleModalClose = (popupState) => {
  //   popupState.close();
  //   setOpen(false);
  // }

  return (
    <div className={classes.root}>
      {console.log('open is set to:', open)}
      <AppBar position="static">
        <Toolbar>
          <PopupState variant='popover' popupId='list-popup-menu'>
            {(popupState) => (
              <>
                <MenuIcon {...bindTrigger(popupState)}/>
                <Menu {...bindMenu(popupState)}>
                  <MenuItem onClick={() => handleMenuOption(popupState)}>Create New List</MenuItem>
                  <CreateListModal open={open} close={handleModalClose} popupState={popupState} />
                </Menu>
              </>
            )}
          </PopupState> 

          <Typography 
          align='center' 
          variant='h6' 
          className={classes.title}
          >
          {isAuth ? `Hello ${user?.firstName} ${user?.lastName}` : 'Welcome To ShoppersList'}
          </Typography>
          {user && (
            <div>
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
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
