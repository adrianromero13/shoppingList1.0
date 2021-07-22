import React, { useState } from 'react';
import {
  makeStyles,
  Grid,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

// import actions
import { deleteItemById } from "../../actions/todos";

// import components
import DeleteItemButton from '../../components/DeleteButton';
import CompleteButton from '../../components/CompleteButton';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '10%'
  },
  background: {
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ListItems({ items }) {
  const classes = useStyles();

  const [hoveringItem, setHoveringItem] = useState(null);

  const activateHover = (index) => {
    if(index >= 0) {
      setHoveringItem(index)
    } else setHoveringItem(null)
  }
  const deactivateHover = () => {
    setHoveringItem(null);
  }

  return (
    <div className={classes.root}>
      <Grid item className={classes.background}>
        <List>
          {items?.todos?.length !== 0 ? items?.todos?.map(({ text, _id, completed }, index) => (
            <ListItem
              key={_id}
              button
              // onClick={() => activateHover(index)}
              onMouseEnter={() => activateHover(index)}
              onMouseLeave={() => deactivateHover()}
              selected={hoveringItem === index}
            >
              <ListItemText 
              primary={`${index + 1}: ${text}`}
              style={{ textDecoration: completed ? 'line-through' : 'none'}}
              />
              {hoveringItem === index &&
                <>
                  <CompleteButton id={_id} text={text} completed={completed}/>
                  <DeleteItemButton id={_id} deleteById={deleteItemById} />
                </>
              }
            </ListItem>
          ))
            : <ListItem>List still doesn't have items</ListItem>
          }
        </List>
      </Grid>
    </div>
  )
};
