import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import theme from '../../themes/default';
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import styles from './styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import Button from '@material-ui/core/Button';

class Error extends Component {
   render() {
      var status = this.props.userError.error ? this.props.userError.error.status : 418;
      var message =  this.props.userError.message ? this.props.userError.message : "I'm a teapot";
      const { classes } = this.props;

      return (
         (status === 401) ? ( 
            <Redirect to="/login"/>
         ) : (
            <ThemeProvider theme={theme}>
               <Grid container wrap="wrap" direction="row" justify="center" alignItems="center" className={classes.root}>
                  <Grid item container wrap="wrap" direction="row" justify="center" alignItems="center">
                     <Grid item xs={12} container justify="center">
                        <img alt="Repassa Logo" src="/images/logo.svg" className={classes.logo} />
                     </Grid>
                     <Grid item xs={12} container justify="center">
                        <Typography variant="h4" gutterBottom>
                           ratings
                        </Typography>
                     </Grid>
                  </Grid>
                  <Grid item container wrap="wrap" direction="row" justify="center" alignItems="center">
                     <Grid item xs={12}>
                        <Typography variant="button" align="center" display="block" gutterBottom className={classes.title}>
                           Erro
                        </Typography>
                     </Grid>
                     <Grid item xs={12} container justify="center">
                        <img alt="Error" src="./images/archive.svg" className={classes.image}/>
                     </Grid>
                     <Grid item xs={12} container justify="center">
                        <Typography variant="button" align="center" display="block" gutterBottom className={classes.title}>
                           {status} - {message}
                        </Typography>
                     </Grid>
                  </Grid>
                  <Grid item container wrap="wrap" direction="row" justify="center" alignItems="center">
                     <Button href="/" startIcon={<KeyboardReturnIcon/>} size="large" className={classes.button}>
                        Voltar
                     </Button>
                  </Grid>
               </Grid>
            </ThemeProvider>
         )
      )
   }
}

Error.propTypes = {
   userError: PropTypes.object.isRequired,
   loggedIn: PropTypes.bool.isRequired,
   classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
   userError: state.userError,
   loggedIn: state.user.loggedIn,
});

export default connect(mapStateToProps, {})(withStyles(styles(theme), { withTheme: true })(Error))