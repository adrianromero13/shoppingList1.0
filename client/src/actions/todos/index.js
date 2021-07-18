import axios from 'axios';
import {
  GET_ALL_LISTS,
  GET_ALL_LISTS_ERROR,
  GET_USER_LISTS,
  GET_USER_LISTS_ERROR,
  CREATE_USER_LIST,
  CREATE_USER_LIST_ERROR,
  CREATE_USER_TODO,
  CREATE_USER_TODO_ERROR,
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
};

export const getUserLists = () => async dispatch => {
  try {
    const { data } = await axios.get('/api/user/list',
      { headers: { 'authorization': localStorage.getItem('token') } });
    dispatch({ type: GET_USER_LISTS, payload: data })
    console.log('getUserLists action', data)
  } catch (e) {
    dispatch({ type: GET_USER_LISTS_ERROR, payload: e });
  }
};

export const createList = (listValues) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      '/api/user/list',
      listValues,
      { headers: { 'authorization': localStorage.getItem('token') } },
    );
    dispatch({ type: CREATE_USER_LIST, payload: data });
    console.log('createList action', data);
  } catch (e) {
    dispatch({ type: CREATE_USER_LIST_ERROR, payload: e });
  }
};

export const createItem = (itemValues, id) => async (dispatch) => {
  console.log('createItem action hit:', itemValues, id )
  try {
    const { data } = await axios.post(
      `/api/user/todo/${id}`,
      itemValues,
      { headers: { 'authorization': localStorage.getItem('token') } },
    );
    dispatch({ type: CREATE_USER_TODO, payload: data });
    console.log('createItem action', data);
  } catch (e) {
    dispatch({ type: CREATE_USER_TODO_ERROR,  payload: e });
  }
};
