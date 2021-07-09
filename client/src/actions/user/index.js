import axios from 'axios';
import { GET_CURRENT_USER, GET_CURRENT_USER_ERROR } from '../types';

export const getCurrentUser = () => async (dispatch) => {
  try {
    const { data } = await axios.get('/api/user', {
      headers: { Authorization: localStorage.getItem('token') },
    });
    dispatch({ type: GET_CURRENT_USER, payload: data });
  } catch (e) {
    dispatch({ type: GET_CURRENT_USER_ERROR, payload: e });
  }
}