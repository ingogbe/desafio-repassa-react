import { GET_RATING_ERROR, LIST_RATING_ERROR, CREATE_RATING_ERROR, EXCLUDE_RATNG_ERROR, UPDATE_RATING_ERROR } from '../actions/codes/errors';

const initialState = {
   error: null,
   message: "",
   flag: false,
   type: ""
}

export default function(state = initialState, action) {
   switch(action.type){
      case GET_RATING_ERROR:
         return {
            ...state,
            error: action.payload,
            message: "Não foi possível buscar a avaliação desejada",
            flag: true,
            type: "error"
         }
      case LIST_RATING_ERROR:
         return {
            ...state,
            error: action.payload,
            message: "Não foi possível listar as avaliações",
            flag: true,
            type: "error"
			}
		case CREATE_RATING_ERROR:
         return {
            ...state,
            error: action.payload,
            message: "Não foi possível criar avaliação",
            flag: true,
            type: "error"
			}
		case EXCLUDE_RATNG_ERROR:
         return {
            ...state,
            error: action.payload,
            message: "Não foi possível excluir avaliação",
            flag: true,
            type: "error"
			}
		case UPDATE_RATING_ERROR:
         return {
            ...state,
            error: action.payload,
            message: "Não foi possível atualizar avaliação",
            flag: true,
            type: "error"
         }
      default: 
         return state;
   }
}