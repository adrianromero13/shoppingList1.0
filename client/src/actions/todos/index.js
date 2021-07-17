import axios from 'axios';
import {
  GET_ALL_LISTS,
  GET_ALL_LISTS_ERROR,
  GET_USER_LISTS,
  GET_USER_LISTS_ERROR,
} from '../types';

export const getAllLists = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/todo');
    dispatch({ type: GET_ALL_LISTS, payload: data });
  } catch (e) {
    dispatch({
      type: GET_ALL_LISTS_ERROR,
      payload: ['Something went wrong, please refresh the page to try again', e],
    });
  }
}

export const getUserLists = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/user/list',
      { headers: { 'authorization': localStorage.getItem('token') } });
      dispatch({ type: GET_USER_LISTS, payload: data })
      console.log('data from action', data)
  } catch (e) {
    dispatch({ type: GET_USER_LISTS_ERROR, payload: e });
  }
}


