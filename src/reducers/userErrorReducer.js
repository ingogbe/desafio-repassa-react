import { USER_LOGIN_ERROR, VALIDATE_SESSION_ERROR } from '../actions/codes/errors';
import { CLEAR_USER_ERROR } from '../actions/codes/types';

import Cookies from 'js-cookie';

const initialState = {
   error: null,
   message: "",
   flag: false,
   type: ""
}

export default function(state = initialState, action) {
   switch(action.type){
      case CLEAR_USER_ERROR:
         return initialState;
      case USER_LOGIN_ERROR:
         window.localStorage.clear();
         Cookies.remove('__session');
         
         return {
            ...state,
            error: action.payload,
            message: "Usuário ou senha inválidos",
            flag: true,
            type: "error"
         }
      case VALIDATE_SESSION_ERROR:
         window.localStorage.clear();
         Cookies.remove('__session');

         return {
            ...state,
            error: action.payload,
            message: "Erro ao validar usúario",
            flag: true,
            type: "validate_error"
         }
      default: 
         return state;
   }
}