import { combineReducers } from 'redux';

import userReducer from './userReducer';
import userErrorReducer from './userErrorReducer';

export default combineReducers({
   user: userReducer,
   userError: userErrorReducer,
});

