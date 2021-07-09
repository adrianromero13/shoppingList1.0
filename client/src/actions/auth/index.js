import axios from 'axios';
import {
  AUTH_USER,
  // AUTH_USER_ERROR,
  // USER_REGISTER_REQUEST,
  // USER_REGISTER_REQUEST_ERROR,
} from '../types';

export const signOut = () => {
  localStorage.removeItem('token');
  return {
    type: AUTH_USER,
    payload: ''
  };
};

// export const registerUser = (formValues, props) => async (dispatch) => {
//   console.log('valuesinRegisterUser', formValues);
//   dispatch({ type: USER_REGISTER_REQUEST, payload: formValues });
//   try {
//     const { data } = await axios.post('/api/auth/signup', formValues);
//     console.log('data received', data);
//     localStorage.setItem('token', data.token);
//     dispatch({ type: AUTH_USER, payload: data.token });
//     props.history.push('/signin');
//   } catch (e) {
//     dispatch({ type: USER_REGISTER_REQUEST_ERROR, payload: e });
//   }
// };

