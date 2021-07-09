import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { ADD_TODO } from '../actions/types';

// import reducers
import authReducer from './authReducer';
import userReducer from './userReducer';

export default combineReducers({
  auth: authReducer,
  currentUser: userReducer,
  form: formReducer.plugin({
    'addTodo': (state, action) => {
      switch (action.type) {
        case ADD_TODO:
          return undefined;
        default:
          return state;
      }
    }
  })
});
