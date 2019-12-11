import { USER_LOGIN, USER_LOGOUT, VALIDATE_SESSION, CLEAR_USER } from '../actions/types';

import Cookies from 'js-cookie';

const initialState = {
   data: {},
   loggedIn: false,
   adminLoggedIn: false
}

export default function(state = initialState, action) {

   switch(action.type){
      case CLEAR_USER:
         window.localStorage.clear();
         Cookies.remove('__session');
         return initialState;
      case USER_LOGIN:
         Cookies.set('__session', action.payload.login_token);

         return {
            ...state,
            data: action.payload.user,
            loggedIn: action.loggedIn,
            adminLoggedIn: action.payload.user.role === "admin" ? true : false
         }
      case VALIDATE_SESSION:           
         return {
            ...state,
            data: action.payload || {},
            loggedIn: action.loggedIn,
            adminLoggedIn: action.payload.role === "admin" ? true : false
         }
      case USER_LOGOUT:
         window.localStorage.clear();
         window.location.reload();
         Cookies.remove('__session');

         return {
            ...state,
            loggedIn: false,
            adminLoggedIn: false
         }
      default: 
         return state;
   }
}