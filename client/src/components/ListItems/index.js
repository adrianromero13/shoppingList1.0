import {
  makeStyles,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@material-ui/core";
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: 'center',
    margin: 'auto, 0',
  },
  background: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

export default function ListItems({ items }) {
  const classes = useStyles();
  // states
  return (
    <div className={classes.root}>
      <Grid item className={classes.background}>
        <Typography variant='h6' className={classes.title}>
          Items for: {items?.title}
        </Typography>
        <List>
      {items?.todos?.map(({ text, _id }, i) => (
          <ListItem key={_id}>
            <ListItemAvatar>
                <ArrowForwardIosIcon color='primary' fontSize='small'/>
            </ListItemAvatar>
            <ListItemText
            primary={`${i+1}: ${text}`}
            />
          </ListItem>
        ))}
        </List>
      </Grid>
    </div>
  )
}
