/* eslint-disable import/no-anonymous-default-export */
import { GET_CURRENT_USER, GET_CURRENT_USER_ERROR } from '../actions/types';

const INITIAL_STATE = {
  getUserData: [],
  getUserDataError: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CURRENT_USER:
      return { ...state, getUserData: action.payload, getUserDataError: '' };
    case GET_CURRENT_USER_ERROR:
      return { ...state, getUserDataError: action.payload }
    default:
      return state;
  }
}
