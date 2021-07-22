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
  Grid,
  AppBar,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove';
import { makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
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
      // id={`scrollable-auto-tabpanel-${index}`}
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

function TabsOrientation(props) {
  const { children, windowSize, ...other } = props;

  return (
    <>
      {windowSize > 720 ? <>
        {children}
      </>
        :
        <AppBar position='static' color='default'>
          {children}
        </AppBar>}
    </>
  )
}

const customColor = grey[800];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '65vh',
    width: '100%',
    position: 'relative',
    '& .MuiBox-root': {
      padding: '0 24px',
    },
  },
  rootVertical: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    // display: 'flex',
    height: '80vh',
    width: '100%',
    position: 'relative',
    '& .MuiBox-root': {
      padding: '0 24px',
    },
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
    width: '30%',
    position: 'relative',
  },
  tabPannel: {
    maxHeight: '75%',
    width: '100%',
    overflow: 'auto',
    '& .MuiBox-root': {
      padding: 'auto 0',
    }
  },
  listTitle: {
    background: customColor,
    paddingTop: '10px',
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    margin: 'auto',
    position: 'sticky',
    top: 0,
    zIndex: 5,
  },
  remove: {
    alignSelf: 'flex-end',
    position: 'sticky',
  },
}));

const Home = () => {
  const classes = useStyles();
  const [value, setValue] = useState(null);
  const [visible, setVisible] = useState(false);
  const [windowSize, setWindowSize] = useState(null);

  const userLists = useSelector(state => state.lists.getLists);

  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleVisibility = () => {
    if (visible) {
      setVisible(false)
    } else setVisible(true)
  }

  useEffect(() => {
    const fetchLists = async () => {
      // setLists(await dispatch(getUserLists()));
      await dispatch(getUserLists());
    }
    function handleResize() {
      setWindowSize(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    fetchLists();
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  return (
    <>
      <div className={windowSize > 720 ? classes.root : classes.rootVertical}>
        <TabsOrientation windowSize={windowSize}>
          <Tabs
            orientation={windowSize > 720 ? 'vertical' : 'horizontal'}
            variant='scrollable'
            value={value}
            onChange={handleChange}
            className={windowSize > 720 ? classes.tabs : null}
          >
            {userLists ? userLists?.map(({ title, _id }, index) => (
              <Tab
                label={title}
                id={`simple-tab-${index}`}
                key={_id}
              />
            ))
              :
              <Tab label='Create A List' />
            }
          </Tabs>
        </TabsOrientation>

        <TabPanel
          index={value}
          value={value}
          className={classes.tabPannel}
        >
          <Grid className={classes.listTitle}>
            <Typography component='h1' variant='h6'>
              {value !== null ? userLists[value]?.title : 'Need a List, Make a List'}
            </Typography>
            {value !== null ?
              <RemoveIcon className={classes.remove} list={userLists[value]}/>
              : null
            }
          </Grid>

          <ListItems items={userLists[value]} />
          <div className={classes.absolute}>
            {visible && <ItemForm
              visible={visible}
              id={userLists[value]?._id}
              title={userLists[value]?.title}
              setVisible={setVisible}
            />}
            {value !== null ?
              <Tooltip title='Add' aria-label='add'>
                <Fab color='primary' placement='bottom-end'>
                  <AddIcon onClick={toggleVisibility} />
                </Fab>
              </Tooltip>
              :
              null
            }
          </div>
        </TabPanel>
      </div>
    </>
  )
};

export default Home;
