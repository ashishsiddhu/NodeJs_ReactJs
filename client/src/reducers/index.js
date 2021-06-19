import {combineReducers} from 'redux';

import login from './loginReducer';
import payment from './PaymentReducer';
import users from './UsersReducer';

const rootReducer = combineReducers({
  login,
  payment,
  users
});

export default rootReducer;