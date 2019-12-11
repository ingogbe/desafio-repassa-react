import { combineReducers } from 'redux';

import userReducer from './userReducer';
import userErrorReducer from './userErrorReducer';

import ratingReducer from './ratingReducer';
import ratingErrorReducer from './ratingErrorReducer';

export default combineReducers({
   user: userReducer,
   userError: userErrorReducer,
   rating: ratingReducer,
   ratingError: ratingErrorReducer
});

