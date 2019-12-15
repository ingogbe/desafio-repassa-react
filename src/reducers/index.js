import { combineReducers } from 'redux';

import userReducer from './userReducer';
import userErrorReducer from './userErrorReducer';

import ratingReducer from './ratingReducer';
import ratingErrorReducer from './ratingErrorReducer';

import accountReducer from './accountReducer';
import accountErrorReducer from './accountErrorReducer';

import notificationsReducer from './notificationReducer';

export default combineReducers({
   user: userReducer,
   userError: userErrorReducer,
   rating: ratingReducer,
   ratingError: ratingErrorReducer,
   account: accountReducer,
   accountError: accountErrorReducer,
   notifications: notificationsReducer
});

