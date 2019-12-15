import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from '../actions/codes/types';
import { objectFilter } from '../utils/Functions';

const initialState = {}

export default function(state = initialState, action) {

   switch(action.type){
      case ADD_NOTIFICATION:
         return {
            ...state,
            [action.payload.id]: action.payload
			}
      case REMOVE_NOTIFICATION:
			return objectFilter(state, item => {
            var res = false;
            if(item.id === action.payload.id) res = true;
            return res;
         })
      default: 
         return state;
   }
}