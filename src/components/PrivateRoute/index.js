import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom';
import PropTypes, { instanceOf } from 'prop-types';
import { connect } from 'react-redux';
import { withCookies, Cookies } from 'react-cookie';

import Grid from '@material-ui/core/Grid';

import { validateSession } from '../../actions/user';
import Loader from '../Loaders/Round';
import Error from '../Error';

class PrivateRoute extends Component {

   getCookies = (cookieName) => {
      const { cookies } = this.props.cookies;
      return cookies[cookieName];
   };

   componentDidMount() {
      this.props.validateSession(this.getCookies('__session'));
   }

   componentDidUpdate(prevProps) {
      const locationChanged = this.props.location.pathname !== prevProps.location.pathname;

      if(locationChanged){
         this.props.validateSession(this.getCookies('__session'));
      }
   }

   render() {
      return (
         this.props.loggedIn ? (
            <Route {...this.props} />
         ) : (
            this.props.error.flag ? (
               <Error/>
            ) : (
               <Grid style={{height: '100vh'}} container direction="row" justify="center" alignItems="center">
                  <Loader />
               </Grid>
            ) 
         )
      )
   }
}

PrivateRoute.propTypes = {
   validateSession: PropTypes.func.isRequired,
   cookies: instanceOf(Cookies).isRequired,
   user: PropTypes.object.isRequired,
   loggedIn: PropTypes.bool.isRequired,
   error: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
   user: state.user.data,
   loggedIn: state.user.loggedIn,
   error: state.userError 
});

export default connect(mapStateToProps, { validateSession })(withRouter(withCookies(PrivateRoute)));