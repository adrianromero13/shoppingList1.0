import React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import { Grow, Fade, Button, Collapse } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';

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
    alert(`submitting: ${JSON.stringify(formValues)}`);
    // try {

    // } catch (e) {

    // }
  }

  return (
      <Fade in={props.visible} style={{ transformOrigin: '0 0 0' }} {...(props.visible ? { timeout: 500} : {})}>
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
      </Fade>
  )
}
