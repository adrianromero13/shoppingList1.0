import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
  Grid,
  Modal,
  Button,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// import action needed
import { createList, getUserLists } from '../../actions/todos';
import { CREATE_USER_LIST_ERROR } from '../../actions/types';
import { Input } from '../../components/Constants';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(1),
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 300,
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(1),
      width: 300,
      height: 50,
    },
    '& .MuiTypography-root': {
      padding: theme.spacing(2),
    },
  },
  modal: {
    position: 'absolute',
    textAlign: 'center',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 1, 3),
    background: theme.palette.background.paper,
  },
}));

const CreateListModal = (props) => {

  const classes = useStyles();
  const { register, handleSubmit, control } = useForm();
  const dispatch = useDispatch();

  // onsubmit funciton
  const onSubmit = async (formValues) => {
    try {
      await dispatch(createList(formValues));
      props.popupState.close();
      await dispatch(getUserLists());
    } catch (e) {
      dispatch({ type: CREATE_USER_LIST_ERROR, payload: e })
      alert('error', e);
    }
  };


  return (
    <>
      {props.open === true &&
        <Modal
          open={props.open}
          onClose={props.close}
          className={classes.root}
        >
          <Grid className={classes.modal}>
            <Typography component='h1' variant='h6'>Create A New list</Typography>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
              <Input
                inputRef={register('title', { required: true })}
                name='title'
                label='List Title'
                control={control}
                defaultValue=''
                rules={{ required: 'Title is required to create List' }}
                type='text'
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
              >Add List</Button>
            </form>
          </Grid>
        </Modal>
      }
    </>
  )
};

export default CreateListModal;
