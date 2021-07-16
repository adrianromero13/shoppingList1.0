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
    bottom: theme.spacing(0),
    right: theme.spacing(0),
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
  const [lists, setLists] = useState({}); // probably don't need anymore

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
  }, []);

  return (
    <>
      <div className={classes.root}>
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
        </TabPanel>
        <Tooltip title='Add' aria-label='add'>
          <Fab color='primary' placement='bottom-end' className={classes.absolute}>
            <AddIcon />
          </Fab>
        </Tooltip>
      </div>
    </>
  )
};

export default Home;
