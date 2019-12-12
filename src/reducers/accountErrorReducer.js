import { CREATE_ACCOUNT_ERROR, GET_ACCOUNT_ERROR, BATCH_DELETE_ACCOUNT_ERROR, DELETE_ACCOUNT_ERROR, UPDATE_ACCOUNT_ERROR, LIST_EMPLOYEES_ACCOUNT_ERROR, LIST_ADMINS_ACCOUNT_ERROR } from '../actions/codes/errors';

const initialState = {
   error: null,
   message: "",
   flag: false,
   type: ""
}

export default function (state = initialState, action) {

   switch (action.type) {
      case CREATE_ACCOUNT_ERROR:
         return {
            ...state,
            error: action.payload,
            message: "Não foi possível criar a conta",
            flag: true,
            type: "error"
         }
      case GET_ACCOUNT_ERROR:
         return {
            ...state,
            error: action.payload,
            message: "Não foi possível buscar a conta",
            flag: true,
            type: "error"
         }
      case DELETE_ACCOUNT_ERROR:
         return {
            ...state,
            error: action.payload,
            message: "Não foi possível excluir a conta",
            flag: true,
            type: "error"
         }
      case BATCH_DELETE_ACCOUNT_ERROR:
         return {
            ...state,
            error: action.payload,
            message: "Não foi possível excluir as contas",
            flag: true,
            type: "error"
         }
      case UPDATE_ACCOUNT_ERROR:
         return {
            ...state,
            error: action.payload,
            message: "Não foi possível atualizar a conta",
            flag: true,
            type: "error"
         }
      case LIST_EMPLOYEES_ACCOUNT_ERROR:
         return {
            ...state,
            error: action.payload,
            message: "Não foi possível listar as contas de funcionários",
            flag: true,
            type: "error"
         }
      case LIST_ADMINS_ACCOUNT_ERROR:
         return {
            ...state,
            error: action.payload,
            message: "Não foi possível listar as contas de administradores",
            flag: true,
            type: "error"
         }  
      default:
         return state;
   }
}