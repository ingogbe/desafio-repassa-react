import { USER_LOGIN, USER_LOGOUT, VALIDATE_SESSION, CHANGE_LOGIN_FLAG } from '../actions/types';

const initialState = {
   data: {},
   loggedIn: false,
   adminLoggedIn: false
}

export default function(state = initialState, action) {
   switch(action.type){
      case USER_LOGIN:
         return {
            ...state,
            data: action.payload,
            loggedIn: action.loggedIn,
            adminLoggedIn: action.adminLoggedIn
         }
      case VALIDATE_SESSION:        
         return {
            ...state,
            data: action.payload.success || {},
            loggedIn: action.payload.success ? true : false,
            adminLoggedIn: action.adminLoggedIn
         }
      case CHANGE_LOGIN_FLAG:
         return {
            ...state,
            loggedIn: action.payload
         }
      case USER_LOGOUT:
         window.localStorage.clear();
         window.location.reload();

         return {
            ...state,
            loggedIn: false,
            adminLoggedIn: false
         }
      default: 
         return state;
   }
}