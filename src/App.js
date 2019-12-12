import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import './App.css';
import store from './store';

import Login from './containers/Login';
import Home from './containers/Home';
import Admin from './containers/Admin';
import PrivateRoute from './components/PrivateRoute';
import RouteNotFound from './containers/NotFound';
import Notification from './components/Notification';

class App extends Component {
   static propTypes = {
      cookies: instanceOf(Cookies).isRequired
   };

   render() {
      return (
         <Provider store={store}>
            <BrowserRouter>
               <Switch>
                  <PrivateRoute exact path='/' component={Home} />
                  <PrivateRoute exact path='/admin' component={Admin} />
                  <Route path='/login' component={Login} />
                  <Route component={RouteNotFound} />
               </Switch>
            </BrowserRouter>
            <Notification/>
         </Provider>
      )
   }
}

export default withCookies(App);
