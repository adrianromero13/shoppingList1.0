import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { compose } from 'redux';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Tabs,
  Tab,
  Typography,
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const Home = () => {
  const classes = useStyles();
  const [value, setValue ] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className={classes.root}>
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
        </Tabs>
        <TabPanel value={value} index={0}>{value}</TabPanel>
        <TabPanel value={value} index={1}>{value}</TabPanel>
        <TabPanel value={value} index={2}>{value}</TabPanel>
        <TabPanel value={value} index={3}>{value}</TabPanel>
        <TabPanel value={value} index={4}>{value}</TabPanel>
        <TabPanel value={value} index={5}>{value}</TabPanel>
        <TabPanel value={value} index={6}>{value}</TabPanel>
      </div>
      <div>Tell me now!</div>
    </>
  )
};

export default Home;
