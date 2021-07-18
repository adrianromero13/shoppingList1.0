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
    padding: theme.spacing(2),
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 300,
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
      width: 300,
      height: 50,
    },
    '& .MuiTypography-root': {
      padding: theme.spacing(2),
    },
  },
}));

const CreateListModal = (props) => {

  const classes = useStyles();
  const { register, handleSubmit, control } = useForm();
  const dispatch = useDispatch();

  // onsubmit funciton
  const onSubmit = async (formValues) => {
    // console.log('formvalues submitted', JSON.stringify(formValues));
    try {
      dispatch(createList(formValues));
      dispatch(getUserLists());
      props.popupState.close();
    } catch (e) {
      dispatch({ type: CREATE_USER_LIST_ERROR, payload: e })
      alert('error', e);
    }
  }


  return (
    <>
      {props.open === true &&
        <Modal
          open={props.open}
          onClose={props.close}
        >
          <Grid className={classes.root}>
            <Typography component='h1' variant='h6'>Hello Modal</Typography>
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
}

export default CreateListModal;
