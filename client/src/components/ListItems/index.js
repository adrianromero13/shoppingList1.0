import {
  makeStyles,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

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

  return (
    <div className={classes.root}>
      <Grid item className={classes.background}>
        <List>
          {items?.todos?.length !== 0 ? items?.todos?.map(({ text, _id }, i) => (
            <ListItem key={_id}>
              <ListItemAvatar>
                <ArrowForwardIosIcon color='primary' fontSize='small' />
              </ListItemAvatar>
              <ListItemText
                primary={text}
              />
            </ListItem>
          ))
            : <ListItem>List still doesn't have items</ListItem>
          }
        </List>
      </Grid>
    </div>
  )
}
