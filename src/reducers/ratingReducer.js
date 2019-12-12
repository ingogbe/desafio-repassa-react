import { GET_RATING, LIST_RATING, CREATE_RATING, EXCLUDE_RATNG, UPDATE_RATING } from '../actions/codes/types';

const initialState = {
	listByAccount: {}
}

var hashRatings = {}

export default function(state = initialState, action) {

   switch(action.type){
      case GET_RATING:
         return {
				...state,
				listByAccount: {
               ...state.listByAccount,
               [action.payload.account]: {
						...state.listByAccount[action.payload.account],
						[action.payload.data.id]: action.payload.data
					}
            }
			}
      case LIST_RATING:
			hashRatings = {}
			action.payload.data.forEach((item, index) => {
				hashRatings[item.id] = item;
			});

			return {
				...state,
				listByAccount: {
					...state.listByAccount,
					[action.payload.account]: hashRatings
				}
			}
      case CREATE_RATING:           
			return {
				...state,
				listByAccount: {
					...state.listByAccount,
					[action.payload.account]: {
						...state.listByAccount[action.payload.account],
						[action.payload.data.id]: action.payload.data
					}
				}
			}
      case UPDATE_RATING:
			return {
				...state,
				listByAccount: {
					...state.listByAccount,
					[action.payload.account]: {
						...state.listByAccount[action.payload.account],
						[action.payload.data.id]: action.payload.data
					}
				}
			}
		case EXCLUDE_RATNG:
			delete state.listByAccount[action.payload.account][action.payload.data.id];
			return state;
      default: 
         return state;
   }
}