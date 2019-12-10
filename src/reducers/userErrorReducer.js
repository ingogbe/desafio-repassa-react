import { CHANGE_LOGIN_FLAG_ERROR, USER_LOGIN_ERROR, VALIDATE_SESSION_ERROR } from '../actions/errors';

const initialState = {
   error: null,
   message: "",
   flag: false,
   type: ""
}



export default function(state = initialState, action) {
   switch(action.type){
      case USER_LOGIN_ERROR:
         window.localStorage.clear();
         window.location.reload();
         
         return {
            ...state,
            error: action.payload,
            message: "Erro ao realizar login do usuário",
            flag: true,
            type: "error"
         }
      case VALIDATE_SESSION_ERROR:
         return {
            ...state,
            error: action.payload,
            message: "Erro ao validar usúario",
            flag: true,
            type: "error"
         }
      case CHANGE_LOGIN_FLAG_ERROR:
         return {
            ...state,
            error: action.payload,
            message: "Erro alterar status de login do usuário",
            flag: true,
            type: "error"
         }
      default: 
         return state;
   }
}