import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';

class Error extends Component {
   render() {
      var { error } = this.props.userError;

      return (

         (error.status === 401 || (error.status === 404 && error.code === "session_not_found")) ? ( 
            <Redirect to="/login"/>
         ) : (
            <Grid container style={{height: '100%'}} alignItems="center">
               <Grid container >
                  <Grid container direction="row" justify="center"><h1><code>Error</code></h1></Grid>
                  <Grid container direction="row" justify="center"><h3><code>{error.status}</code></h3></Grid>
                  <Grid container direction="row" justify="center"><h3><code>{error.message}</code></h3></Grid>
               </Grid>
            </Grid>
         )
            
      )
   }
}

Error.propTypes = {
   userError: PropTypes.object.isRequired,
   loggedIn: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
   userError: state.userError,
   loggedIn: state.user.loggedIn,
});

export default connect(mapStateToProps)(Error);