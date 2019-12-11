import { GET_RATING, LIST_RATING, CREATE_RATING, EXCLUDE_RATNG, UPDATE_RATING } from './types';
import { GET_RATING_ERROR, LIST_RATING_ERROR, CREATE_RATING_ERROR, EXCLUDE_RATNG_ERROR, UPDATE_RATING_ERROR } from './errors';

import Axios from 'axios';

import { host } from '../utils/Consts';

export const get = (session, accountId, ratingId) => dispatch => {
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

export const exclude = (session, accountId, ratingId) => dispatch => {
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
   }).catch(err => {
      dispatch({
         type: EXCLUDE_RATNG_ERROR,
         payload: err.response ? err.response.data : (err.request || err.message)
      });
   });
   
}

export const update = (session, accountId, ratingId, ratingObj) => dispatch => {
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
   }).catch(err => {
      dispatch({
         type: UPDATE_RATING_ERROR,
         payload: err.response ? err.response.data : (err.request || err.message)
      });
   });
}

export const create = (session, accountId, ratingObj) => dispatch => {
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
   }).catch(err => {
      dispatch({
         type: CREATE_RATING_ERROR,
         payload: err.response ? err.response.data : (err.request || err.message)
      });
   });
}


export const list = (session, accountId) => dispatch => {
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