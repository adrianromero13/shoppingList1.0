import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { compose } from 'redux';
import { Switch, Route } from 'react-router-dom';
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
    bottom: theme.spacing(2),
    right: theme.spacing(1),
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const Home = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [lists, setLists] = useState({});

  const userLists = useSelector(state => state.lists.getLists);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchLists = async () => {
      // setLists(await dispatch(getUserLists()));
      await dispatch(getUserLists());
    }

    fetchLists();
  }, [dispatch]);
  // useEffect(() => {
  //   if (!lists || lists.length === 0) {
  //     dispatch(getUserLists());
  //   }
  //   setLists(userLists);
  //   return () => {
  //     // 
  //   }
  // }, [userLists, lists]);

  return (
    <>
      <div className={classes.root}>
        {/* {lists?.map(({title, _id, index}) => {
          return <div key={_id}>{title}{index}</div>
        })} */}
        {console.log('lists', userLists)}
        {console.log('state.lists', userLists[value])}
        <Tabs
          orientation='vertical'
          variant='scrollable'
          value={value}
          onChange={handleChange}
          className={classes.tabs}
        >
         {userLists?.map(({title, todos, _id}, index) => (
           <Tab
           label={title}
           id={`simple-tab-${index}`}
           key={_id}
           />
         ))}
          {/* <Tab label='first tab' /> */}
          {/* <Tab label='Item One' />
          <Tab label='Item Two' />
          <Tab label='Item Three' />
          <Tab label='Item Four' />
          <Tab label='Item Five' />
          <Tab label='Item Six' />
        <Tab label='Item Seven' /> */}
          {/* <Button className={classes.absolute}>Add</Button> */}
        </Tabs>
        <TabPanel index={value} value={value} >
          <div>
          {userLists[value]?.todos?.map(({text, _id}, i) => (
            <li key={_id}>{i+1}: {text}</li>
          ))}
          </div>
        </TabPanel>
        {/* <TabPanel value={value} index={value}>{value + 1}</TabPanel> */}
        <Tooltip title='Add' aria-label='add'>
          <Fab color='primary' placement='bottom-end' className={classes.absolute}>
            {/* <Fab color='primary' placement='bottom-end'> */}
            <AddIcon />
          </Fab>
        </Tooltip>
      </div>
    </>
  )
};

export default Home;
