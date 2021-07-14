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

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

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
    const fetLists = async () => {
      setLists(await dispatch(getUserLists()));
    }

    fetLists();
  }, [lists]);
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
        <Tabs
          orientation='vertical'
          variant='scrollable'
          value={value}
          onChange={handleChange}
          aria-label='Vertical tabs example'
          className={classes.tabs}
        >
         
          <Tab label='Item One' {...a11yProps(0)} />
          <Tab label='Item Two' {...a11yProps(1)} />
          <Tab label='Item Three' {...a11yProps(2)} />
          <Tab label='Item Four' {...a11yProps(3)} />
          <Tab label='Item Five' {...a11yProps(4)} />
          <Tab label='Item Six' {...a11yProps(5)} />
          <Tab label='Item Seven' {...a11yProps(6)} />
          <Tab className={classes.absolute} label='Add' />
        </Tabs>
        <TabPanel value={value} index={0}>{value + 1}</TabPanel>
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
