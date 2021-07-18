import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import { Grow, Fade, Button, Collapse } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

import { createItem, getUserLists } from '../../actions/todos';
import { CREATE_USER_TODO_ERROR } from '../../actions/types';
import { Input } from '../../components/Constants';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    // width: '100%',
  },
  container: {
    display: 'flex',
  },
  paper: {
    margin: theme.spacing(1),
  },
})); // might not need


export default function ItemForm(props) {
  const classes = useStyles(); // might not need
  const { register, handleSubmit, control } = useForm();
  const dispatch = useDispatch();

  // handlesubmit function
  const onSubmit = async (formValues) => {  
    const listId = props.id;
    try {
      await dispatch(createItem(formValues, listId));
      props.setVisible(false);
      await dispatch(getUserLists());
    } catch (e) {
      dispatch({type: CREATE_USER_TODO_ERROR, payload: e });
      alert(`Error: ${e}`)
    }
  }

  return (
      <Grow in={props.visible} style={{ transformOrigin: '0 0 0' }} {...(props.visible ? { timeout: 500} : {})}>
        <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
          <Input
            inputRef={register('text', { required: true })}
            name='text'
            label={`Item for ${props.title}`}
            control={control}
            defaultValue=''
            rules={{ required: 'text is required before you submit' }}
            type='text'
          />
          <Button type='submit'>
            <CheckIcon />
          </Button>
        </form>
      </Grow>
  )
}
