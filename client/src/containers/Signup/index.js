// import React from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import {
//   TextField,
//   Button,
//   Avatar,
//   Typography,
//   FormControlLabel,
//   FormControl,
//   Container,
//   CssBaseline,
// } from '@material-ui/core';
// import { LockOutlinedIcon } from '@material-ui/icons/LockOutlined';
// import { makeStyles } from '@material-ui/core/styles';
import React, { createRef, forwardRef } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm, Controller } from 'react-hook-form'

import { CustomInput, Form, Input } from '../../components/Constants';


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

const Signup = () => {
  const ref = createRef();
  const classes = useStyles();
  const { register, handleSubmit, control } = useForm();

  const onSubmit = data => {
    console.log('Why is this not working!', data);
  };

  return (
    // <Container component="main" maxWidth="xs">
    <Grid className={classes.root}>
      <Avatar>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign Up
        </Typography>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.root}>
        <Input
        
          // {...register('firstName', { required: true })}
          inputRef={register('firstName', { required: true })}
          name='firstName'
          label='First Name'
          control={control}
          defaultValue=''
          rules={{ required: 'First Name Required' }}
          type='text'
        />
        <Input
          // {...forwardRef(register('lastName', { required: true }))}
          inputRef={register('lastName', {required: true })}
          name='lastName'
          label='Last Name'
          control={control}
          defaultValue=''
          rules={{ required: 'Last Name Required' }}
          type='text'
        />
        <Input
          // {...forwardRef(register('email', { required: true }))}
          inputRef={register('email', {required: true })}
          name='email'
          label='E-mail'
          autoComplete='email'
          control={control}
          defaultValue=''
          rules={{required: 'Email is Required'}}
          type='email'
          />
          <Input
          inputRef={register('password', {required: true })}
          name='password'
          type='password'
          label='Password'
          control={control}
          defaultValue=''
          rules={{required: 'Password is Required'}}
          />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Sign Up
          </Button>
      </form>
    </Grid>
  )
}

export default Signup;

