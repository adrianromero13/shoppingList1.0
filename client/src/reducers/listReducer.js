/* eslint-disable import/no-anonymous-default-export */
import {
  GET_USER_LISTS,
  GET_USER_LISTS_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
  getLists: [],
  getListsError: '',
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_USER_LISTS:
      return { ...state, getLists: action.payload, getListsError: '' };
    case GET_USER_LISTS_ERROR:
      return { ...state, getListsError: action.payload };
    default:
      return state;
  }
}
