import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function loginReducer(state = initialState.users, action) {
  switch (action.type) {
    case types.USERS_SUCCESS:
      return Object.assign({}, state, 
        { 
            users: action.user
        });
    // case types.USER_SUCCESS:
    //   return Object.assign({}, state, { email: action.user.email });
    default:
      return state;
  }
}
