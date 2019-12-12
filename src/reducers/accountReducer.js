import { CREATE_ACCOUNT, GET_ACCOUNT, DELETE_ACCOUNT, BATCH_DELETE_ACCOUNT, UPDATE_ACCOUNT, LIST_EMPLOYEES_ACCOUNT, LIST_ADMINS_ACCOUNT } from '../actions/codes/types';
import { objectFilter } from '../utils/Functions';

const initialState = {
   employees: {},
   admins: {}
}

export default function (state = initialState, action) {

   var hashAccounts = {};

   switch (action.type) {
      case CREATE_ACCOUNT:
         if(action.payload.data.role === 'admin'){
            return {
               ...state,
               admins: {
                  ...state.admins,
                  [action.payload.data.id]: action.payload.data
               }
            }
         }
         else {
            return {
               ...state,
               employees: {
                  ...state.employees,
                  [action.payload.data.id]: action.payload.data
               }
            }
         }
      case GET_ACCOUNT:
         if(action.payload.data.role === 'admin'){
            return {
               ...state,
               admins: {
                  ...state.admins,
                  [action.payload.data.id]: action.payload.data
               }
            }
         }
         else {
            return {
               ...state,
               employees: {
                  ...state.employees,
                  [action.payload.data.id]: action.payload.data
               }
            }
         }
      case DELETE_ACCOUNT:
         if(state.employees[action.payload.data.id]){
            delete state.employees[action.payload.data.id];
         }
         if(state.admins[action.payload.data.id]){
            delete state.admins[action.payload.data.id];
         }

         return state;
      case BATCH_DELETE_ACCOUNT:
         var ids = action.payload.data.ids;

         return {
            ...state,
            employees: objectFilter(state.employees, item => {
               var res = false;
               ids.forEach((s, si) => {if(item.id === s) res = true;});
               return res;
            }),
            admins: objectFilter(state.admins, item => {
               var res = false;
               ids.forEach((s, si) => {if(item.id === s) res = true;});
               return res;
            })
         }

         

         // for (var key in state.employees) {
         //    ids.forEach((id, i) => {
         //       if (key !== id) {
         //          newState.employees[key] = state.employees[key];
         //       }
         //    })
         // }

         // for (var key in state.admins) {
         //    ids.forEach((id, i) => {
         //       if (key !== id) {
         //          newState.admins[key] = state.admins[key];
         //       }
         //    })
         // }
      case UPDATE_ACCOUNT:
         if(action.payload.data.role === 'admin'){
            return {
               ...state,
               admins: {
                  ...state.admins,
                  [action.payload.data.id]: action.payload.data
               }
            }
         }
         else {
            return {
               ...state,
               employees: {
                  ...state.employees,
                  [action.payload.data.id]: action.payload.data
               }
            }
         }
      case LIST_EMPLOYEES_ACCOUNT:
         hashAccounts = {};
			action.payload.data.forEach((item, index) => {
				hashAccounts[item.id] = item;
			});

			return {
				...state,
				employees: hashAccounts
			}
      case LIST_ADMINS_ACCOUNT:
         hashAccounts = {};
			action.payload.data.forEach((item, index) => {
				hashAccounts[item.id] = item;
			});

			return {
				...state,
				employees: hashAccounts
			}  
      default:
         return state;
   }
}