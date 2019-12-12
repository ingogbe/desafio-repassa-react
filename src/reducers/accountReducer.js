import { CREATE_ACCOUNT, GET_ACCOUNT, DELETE_ACCOUNT, BATCH_DELETE_ACCOUNT, UPDATE_ACCOUNT, LIST_EMPLOYEES_ACCOUNT, LIST_ADMINS_ACCOUNT } from '../actions/codes/types';

const initialState = {
   employees: {},
   admins: {}
}

var hashAccounts = {};

export default function (state = initialState, action) {

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

         ids.forEach((item, index) => {
            if(state.employees[item]){
               delete state.employees[item];
            }
            if(state.admins[item]){
               delete state.admins[item];
            }
         });

         return state;
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