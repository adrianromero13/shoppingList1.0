import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { CustomInput, Form, Input } from '../../components/Constants';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),
    '& .MuiTexField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));

const Signup = ({ handleClose }) => {
  const classes = useStyles();
  const { handleSubmit, control } = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <Form onSubmit={onSubmit} className={classes.root}>
      <Input
        name='lastName'
        control={control}
        defaultValue=''
        label='First Name'
        rules={{ required: 'Last name required' }}
      />
      <Input
        name='firstName'
        control={control}
        defaultValue=''
        label='Last Name'
        rules={{ required: 'First Name required' }}
      />
      <Input
        name='password'
        type='password'
        control={control}
        defaultValue=''
        label='Password'
        rules={{ required: 'Password required' }}
        />
        <Button
        variant='contained'
        color='primary'
        type='submit'
        >Sign Up</Button>
        {/* <Controller
        name='firstName'
        control={control}
        defaultValue=''
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <TextField
            label='First Name'
            variant='filled'
            value={value}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
        )}
        rules={{ required: 'Last name required' }}
      /> */}

    </Form>
  )
}

export default Signup;

