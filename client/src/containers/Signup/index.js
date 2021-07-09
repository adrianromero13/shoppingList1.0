
import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// import actions
// import { registerUser } from '../../actions/auth';
// import components
import { Input } from '../../components/Constants';
import { AUTH_USER, USER_REGISTER_REQUEST_ERROR } from '../../actions/types';


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

const Signup = (props) => {
  // const ref = createRef();
  const classes = useStyles();
  const { register, handleSubmit, control } = useForm();
  const dispatch = useDispatch();

  const onSubmit = async (formValues) => {
    // dispatch(registerUser(data));
    // props.history.push('/signin')
    try {
      const { data } = await axios.post('/api/auth/signup', formValues);
      console.log('data recieved', data);
      localStorage.setItem('token', data.token);
      dispatch({ type: AUTH_USER, payload: data.token });
      props.history.push('/signin');
    } catch (e) {
      dispatch({ type: USER_REGISTER_REQUEST_ERROR, payload: e });
    }
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
          inputRef={register('lastName', { required: true })}
          name='lastName'
          label='Last Name'
          control={control}
          defaultValue=''
          rules={{ required: 'Last Name Required' }}
          type='text'
        />
        <Input
          // {...forwardRef(register('email', { required: true }))}
          inputRef={register('email', { required: true })}
          name='email'
          label='E-mail'
          autoComplete='email'
          control={control}
          defaultValue=''
          rules={{ required: 'Email is Required' }}
          type='email'
        />
        <Input
          inputRef={register('password', { required: true })}
          name='password'
          type='password'
          label='Password'
          control={control}
          defaultValue=''
          rules={{ required: 'Password is Required' }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >Sign Up</Button>
      </form>
    </Grid>
  )
}

export default Signup;

