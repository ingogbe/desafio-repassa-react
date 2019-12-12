import { CREATE_ACCOUNT, GET_ACCOUNT, BATCH_DELETE_ACCOUNT, DELETE_ACCOUNT, UPDATE_ACCOUNT, LIST_EMPLOYEES_ACCOUNT, LIST_ADMINS_ACCOUNT } from '../actions/codes/types';
import { CREATE_ACCOUNT_ERROR, GET_ACCOUNT_ERROR, BATCH_DELETE_ACCOUNT_ERROR, DELETE_ACCOUNT_ERROR, UPDATE_ACCOUNT_ERROR, LIST_EMPLOYEES_ACCOUNT_ERROR, LIST_ADMINS_ACCOUNT_ERROR } from '../actions/codes/errors';

import Axios from 'axios';
import Cookies from 'js-cookie';
import { success, error } from 'react-notification-system-redux';

import { host } from '../utils/Consts';
import { createNotification } from '../utils/Functions';

export const create = (accountObj) => dispatch => {
   var session = Cookies.get('__session');

   Axios.post(host + '/api/account/create', accountObj, {
      withCredentials: true,
      headers: {
         'Authorization': 'Bearer ' + session
      }
   }).then(res => {
      dispatch({
         type: CREATE_ACCOUNT,
         payload: {
				data: res.data.data
			}
      });
      dispatch(
         success(createNotification("Sucesso", "Conta criada com sucesso"))
      );
   }).catch(err => {
      dispatch({
         type: CREATE_ACCOUNT_ERROR,
         payload: err.response ? err.response.data : (err.request || err.message)
      });
      dispatch(
         error(createNotification("Erro", "Erro ao criar conta"))
      );
   });
}

export const get = (accountId) => dispatch => {
   var session = Cookies.get('__session');

   Axios.get(host + '/api/account/'+ accountId +'/get', {
      withCredentials: true,
      headers: {
         'Authorization': 'Bearer ' + session
      }
   }).then(res => {
      dispatch({
         type: GET_ACCOUNT,
         payload: {
				data: res.data.data
			},
      });
   }).catch(err => {
      dispatch({
         type: GET_ACCOUNT_ERROR,
         payload: err.response ? err.response.data : (err.request || err.message)
      });
   });
}

export const exclude = (accountId) => dispatch => {
   var session = Cookies.get('__session');

   Axios.delete(host + '/api/account/'+ accountId +'/delete', {
      withCredentials: true,
      headers: {
         'Authorization': 'Bearer ' + session
      }
   }).then(res => {
      dispatch({
         type: DELETE_ACCOUNT,
         payload: {
				data: res.data.data
			}
      });
      dispatch(
         success(createNotification("Sucesso", "Conta exclída com sucesso"))
      );
   }).catch(err => {
      dispatch({
         type: DELETE_ACCOUNT_ERROR,
         payload: err.response ? err.response.data : (err.request || err.message)
      });
      dispatch(
         error(createNotification("Erro", "Erro ao deletar conta"))
      );
   });
   
}

export const batchDelete = (accountIds) => dispatch => {
   var session = Cookies.get('__session');

   Axios.post(host + '/api/account/batch/delete', {ids: accountIds}, {
      withCredentials: true,
      headers: {
         'Authorization': 'Bearer ' + session
      }
   }).then(res => {
      dispatch({
         type: BATCH_DELETE_ACCOUNT,
         payload: {
				data: res.data.data
			}
      });
      dispatch(
         success(createNotification("Sucesso", "Contas excluídas com sucesso"))
      );
   }).catch(err => {
      dispatch({
         type: BATCH_DELETE_ACCOUNT_ERROR,
         payload: err.response ? err.response.data : (err.request || err.message)
      });
      dispatch(
         error(createNotification("Erro", "Erro ao deletar contas"))
      );
   });
   
}



export const update = (accountId, accountObj) => dispatch => {
   var session = Cookies.get('__session');

   Axios.post(host + '/api/account/'+ accountId +'/update', accountObj, {
      withCredentials: true,
      headers: {
         'Authorization': 'Bearer ' + session
      }
   }).then(res => {
      dispatch({
         type: UPDATE_ACCOUNT,
         payload: {
				data: res.data.data
			}
      });
      dispatch(
         success(createNotification("Sucesso", "Conta atualizada com sucesso"))
      );
   }).catch(err => {
      dispatch({
         type: UPDATE_ACCOUNT_ERROR,
         payload: err.response ? err.response.data : (err.request || err.message)
      });
      dispatch(
         error(createNotification("Erro", "Erro ao atualizar conta"))
      );
   });
}


export const listEmployees = () => dispatch => {
   var session = Cookies.get('__session');

   Axios.get(host + '/api/account/list/employees', {
      withCredentials: true,
      headers: {
         'Authorization': 'Bearer ' + session
      }
   }).then(res => {
      dispatch({
         type: LIST_EMPLOYEES_ACCOUNT,
         payload: {
				data: res.data.data
			}
      });
   }).catch(err => {
      dispatch({
         type: LIST_EMPLOYEES_ACCOUNT_ERROR,
         payload: err.response ? err.response.data : (err.request || err.message)
      });
   });
}

export const listAdmins = () => dispatch => {
   var session = Cookies.get('__session');
   
   Axios.get(host + '/api/account/list/admins', {
      withCredentials: true,
      headers: {
         'Authorization': 'Bearer ' + session
      }
   }).then(res => {
      dispatch({
         type: LIST_ADMINS_ACCOUNT,
         payload: {
				data: res.data.data
			}
      });
   }).catch(err => {
      dispatch({
         type: LIST_ADMINS_ACCOUNT_ERROR,
         payload: err.response ? err.response.data : (err.request || err.message)
      });
   });
}