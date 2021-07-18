import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Tabs,
  Tab,
  Typography,
  Box,
  Tooltip,
  Fab,
  Button,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'
import { makeStyles } from '@material-ui/core/styles';

import { getUserLists } from '../../actions/todos';
import ListItems from '../../components/ListItems';
import ItemForm from '../ItemForm';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>
            {children}
          </Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '65vh',
    width: '100%',
    position: 'relative',
  },
  absolute: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: theme.spacing(3),
    right: theme.spacing(2),
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    height: '100%',
    position: 'relative',
  },
}));

const Home = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [visible, setVisible] = useState(false);

  const userLists = useSelector(state => state.lists.getLists);

  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleVisibility = () => {
    if(visible) {
      setVisible(false)
    } else setVisible(true)
  }

  useEffect(() => {
    const fetchLists = async () => {
      // setLists(await dispatch(getUserLists()));
      await dispatch(getUserLists());
    }

    fetchLists();
  }, [dispatch]);

  return (
    <>
      <div className={classes.root}>
        {console.log('visible: ', visible)}
        <Tabs
          orientation='vertical'
          variant='scrollable'
          value={value}
          onChange={handleChange}
          className={classes.tabs}
        >
          {userLists?.map(({ title, _id }, index) => (
         <Tab
              label={title}
              id={`simple-tab-${index}`}
              key={_id}
              />
          ))}
        </Tabs>
        <TabPanel index={value} value={value} >
            <ListItems items={userLists[value]} />
            <div className={classes.absolute}>
              {visible && <ItemForm visible={visible} id={userLists[value]?._id} title={userLists[value]?.title}/>}
        <Tooltip title='Add' aria-label='add'>
          <Fab color='primary' placement='bottom-end'>
            <AddIcon onClick={toggleVisibility}/>
          </Fab>
        </Tooltip>
            </div>
        </TabPanel>
      </div>
    </>
  )
};

export default Home;
