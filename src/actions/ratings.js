import { GET_RATING, LIST_RATING, CREATE_RATING, EXCLUDE_RATNG, UPDATE_RATING, INCREMENT_ACCOUNT_RATING_COUNTER, DECREMENT_ACCOUNT_RATING_COUNTER } from './codes/types';
import { GET_RATING_ERROR, LIST_RATING_ERROR, CREATE_RATING_ERROR, EXCLUDE_RATNG_ERROR, UPDATE_RATING_ERROR } from './codes/errors';

import Axios from 'axios';
import Cookies from 'js-cookie';
import { success, error } from './notification';

import { host } from '../utils/Consts';

export const get = (accountId, ratingId) => dispatch => {
   var session = Cookies.get('__session');

   Axios.get(host + '/api/employee/'+ accountId +'/rating/'+ ratingId +'/get', {
      withCredentials: true,
      headers: {
         'Authorization': 'Bearer ' + session
      }
   }).then(res => {
      dispatch({
         type: GET_RATING,
         payload: {
				data: res.data.data,
				account: accountId
			},
      });
      
   }).catch(err => {
      dispatch({
         type: GET_RATING_ERROR,
         payload: err.response ? err.response.data : (err.request || err.message)
      });
   });
}

export const exclude = (accountId, ratingId) => dispatch => {
   var session = Cookies.get('__session');

   Axios.delete(host + '/api/employee/'+ accountId +'/rating/'+ ratingId +'/delete', {
      withCredentials: true,
      headers: {
         'Authorization': 'Bearer ' + session
      }
   }).then(res => {
      dispatch({
         type: EXCLUDE_RATNG,
         payload: {
				data: res.data.data,
				account: accountId
			}
      });

      dispatch({
         type: DECREMENT_ACCOUNT_RATING_COUNTER,
         payload: {
				account: accountId
			}
      });

      dispatch(
         success("Sucesso", "Avaliação excluída com sucesso", "br", 3)
      );
   }).catch(err => {
      dispatch({
         type: EXCLUDE_RATNG_ERROR,
         payload: err.response ? err.response.data : (err.request || err.message)
      });
      dispatch(
         error("Erro", "Erro ao excluir avaliação", "br", 3)
      );
   });
   
}

export const update = (accountId, ratingId, ratingObj) => dispatch => {
   var session = Cookies.get('__session');

   Axios.post(host + '/api/employee/'+ accountId +'/rating/'+ ratingId +'/update', ratingObj, {
      withCredentials: true,
      headers: {
         'Authorization': 'Bearer ' + session
      }
   }).then(res => {
      dispatch({
         type: UPDATE_RATING,
         payload: {
				data: res.data.data,
				account: accountId
			}
      });
      dispatch(
         success("Sucesso", "Avaliação atualizada com sucesso", "br", 3)
      );
   }).catch(err => {
      dispatch({
         type: UPDATE_RATING_ERROR,
         payload: err.response ? err.response.data : (err.request || err.message)
      });
      dispatch(
         error("Erro", "Erro ao atualizar avaliação", "br", 3)
      );
   });
}

export const create = (accountId, ratingObj) => dispatch => {
   var session = Cookies.get('__session');

   Axios.post(host + '/api/employee/'+ accountId +'/rating/create', ratingObj, {
      withCredentials: true,
      headers: {
         'Authorization': 'Bearer ' + session
      }
   }).then(res => {
      dispatch({
         type: CREATE_RATING,
         payload: {
				data: res.data.data,
				account: accountId
			}
      });

      dispatch({
         type: INCREMENT_ACCOUNT_RATING_COUNTER,
         payload: {
				account: accountId
			}
      });

      dispatch(
         success("Sucesso", "Avaliação criada com sucesso", "br", 3)
      );
   }).catch(err => {
      dispatch({
         type: CREATE_RATING_ERROR,
         payload: err.response ? err.response.data : (err.request || err.message)
      });
      dispatch(
         error("Erro", "Erro ao criar avaliação", "br", 3)
      );
   });
}


export const list = (accountId) => dispatch => {
   var session = Cookies.get('__session');

   Axios.get(host + '/api/employee/'+ accountId +'/rating/list', {
      withCredentials: true,
      headers: {
         'Authorization': 'Bearer ' + session
      }
   }).then(res => {
      dispatch({
         type: LIST_RATING,
         payload: {
				data: res.data.data,
				account: accountId
			}
      });
   }).catch(err => {
      dispatch({
         type: LIST_RATING_ERROR,
         payload: err.response ? err.response.data : (err.request || err.message)
      });
   });
}