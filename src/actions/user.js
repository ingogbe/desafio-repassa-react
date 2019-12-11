import { USER_LOGIN, USER_LOGOUT, VALIDATE_SESSION } from './types';
import { USER_LOGIN_ERROR, VALIDATE_SESSION_ERROR } from './errors';

import Axios from 'axios';

import { host } from '../utils/Consts';

export const login = (email, password, keep) => dispatch => {
   Axios.post(host + '/api/login', {
      email: email,
      password: password,
      keep: keep
   },{
      withCredentials: true
   }).then(res => {
      dispatch({
         type: USER_LOGIN,
         payload: res.data.data,
         loggedIn: true
      });
   }).catch(err => {
      dispatch({
         type: USER_LOGIN_ERROR,
         payload: err.response ? err.response.data : (err.request || err.message),
         loggedIn: false
      });
   });
}

export const validateSession = (session) => dispatch => {
   Axios.get(host + '/api/validate', {
      withCredentials: true,
      headers: {
         'Authorization': 'Bearer ' + session
      }
   }).then(res => {
      dispatch({
         type: VALIDATE_SESSION,
         payload: res.data.data,
         adminLoggedIn: res.data.success ? res.data.success.admin ? res.data.success.admin : false : false
      });
   }).catch(err => {
      dispatch({
         type: VALIDATE_SESSION_ERROR,
         payload: err.response ? err.response.data : (err.request || err.message)
      });
   });
   
}

export const logout = () => dispatch => {
   Axios.post(host + '/api/logout', {},{
      withCredentials: true
   }).then(res => {
      dispatch({
         type: USER_LOGOUT,
         loggedIn: false
      });
   }).catch(err => {
      dispatch({
         type: USER_LOGIN_ERROR,
         payload: err.response ? err.response.data : (err.request || err.message),
         loggedIn: false
      });
   });
}