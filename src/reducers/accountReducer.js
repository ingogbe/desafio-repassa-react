import { CREATE_ACCOUNT, GET_ACCOUNT, DELETE_ACCOUNT, BATCH_DELETE_ACCOUNT, UPDATE_ACCOUNT, LIST_EMPLOYEES_ACCOUNT, LIST_ADMINS_ACCOUNT, INCREMENT_ACCOUNT_RATING_COUNTER, DECREMENT_ACCOUNT_RATING_COUNTER } from '../actions/codes/types';

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
				admins: hashAccounts
         }  
      case INCREMENT_ACCOUNT_RATING_COUNTER:
         if(state.employees[action.payload.account]){
            return {
               ...state,
               employees: {
                  ...state.employees,
                  [action.payload.account]: {
                     ...state.employees[action.payload.account],
                     ratings: state.employees[action.payload.account].ratings + 1
                  }
               }
            } 
         }
         else if(state.admins[action.payload.account]){
            return {
               ...state,
               admins: {
                  ...state.admins,
                  [action.payload.account]: {
                     ...state.admins[action.payload.account],
                     ratings: state.admins[action.payload.account].ratings + 1
                  }
               }
            }
         }
         else{
            return state;
         }
      case DECREMENT_ACCOUNT_RATING_COUNTER:
         if(state.employees[action.payload.account]){
            return {
               ...state,
               employees: {
                  ...state.employees,
                  [action.payload.account]: {
                     ...state.employees[action.payload.account],
                     ratings: state.employees[action.payload.account].ratings - 1
                  }
               }
            } 
         }
         else if(state.admins[action.payload.account]){
            return {
               ...state,
               admins: {
                  ...state.admins,
                  [action.payload.account]: {
                     ...state.admins[action.payload.account],
                     ratings: state.admins[action.payload.account].ratings - 1
                  }
               }
            }
         }
         else{
            return state;
         }         
      default:
         return state;
   }
}