import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes, { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {withStyles, ThemeProvider} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Loader from '../../components/Loaders/Round';
import { login, validateSession } from '../../actions/user';
import theme from '../../themes/default';

import styles from './styles';

class Login extends Component {

   constructor(props){
      super(props);

      this.state = {
         email: '',
         password: '',
         keep: false,
         loading: false
      }
      
   }

   getCookies = (cookieName) => {
      const { cookies } = this.props.cookies;
      return cookies[cookieName];
   };

   componentDidMount() {
      this.props.validateSession(this.getCookies('__session'));
   }

   login = (event) => {
      event.preventDefault();

      this.props.login(this.state.email, this.state.password, this.state.keep);

      this.setState({
         email: '',
         password: '',
         keep: false,
         loading: true
      });
   };

   onChange = (e) => {
      this.setState({
         [e.target.name]: e.target.value
      });
   }

   onChangeChecked = (e, checked) => {
      this.setState({
         [e.target.name]: checked
      });
   }

   render() {
      const { classes, loggedIn, userError } = this.props;
      const loading = (userError.flag) ? false : this.state.loading;

      return loggedIn ? (
         <Redirect to="/"/>
      ) : (
         <ThemeProvider theme={theme}>
            <main className={classes.main}>
               <CssBaseline />
               <Paper className={classes.paper}>
                  <img alt="Repassa Logo" src="/images/logo.svg" className={classes.logo} />
                  <Typography variant="h4" gutterBottom>
                     ratings
                  </Typography>
                  <form onSubmit={this.login} className={classes.form}>
                     <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <Input disabled={loading} value={this.state.email} onChange={this.onChange} id="email" name="email" autoComplete="email" autoFocus />
                     </FormControl>
                     <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="password">Senha</InputLabel>
                        <Input disabled={loading} value={this.state.password} onChange={this.onChange} name="password" type="password" id="password" autoComplete="current-password" />
                     </FormControl>
                     <FormControlLabel control={
                        <Checkbox name="keep" checked={this.state.keep} onChange={this.onChangeChecked} disabled={loading} color="primary" />
                     } label="Lembrar-me" />

                     {loading ? (
                        <Grid container direction="row" justify="center" alignItems="center"><Loader/></Grid>
                     ) : (
                        <Grid container direction="row" justify="center" alignItems="center">
                           <Button color="primary" disabled={loading} type="submit" variant="contained" className={classes.submit} >
                              Entrar
                           </Button>
                        </Grid>
                     )}

                     {(userError.flag && userError.type === "error") ? (
                        <Grid container direction="row" justify="center" alignItems="center" className={classes.mt10}>
                           <Typography variant="body1" color="error" align="center" gutterBottom>
                              {userError.message}
                           </Typography>
                        </Grid>
                     ): ""}
                  </form>
               </Paper>
            </main>
         </ThemeProvider>
      );
   }
}

Login.propTypes = {
   classes: PropTypes.object.isRequired,
   login: PropTypes.func.isRequired,
   validateSession: PropTypes.func.isRequired,
   user: PropTypes.object.isRequired,
   cookies: instanceOf(Cookies).isRequired,
   loggedIn: PropTypes.bool.isRequired,
   userError: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
   user: state.user.data,
   loggedIn: state.user.loggedIn,
   userError: state.userError
});

export default connect(mapStateToProps, { login, validateSession })(withStyles(styles(theme))(withCookies(Login)));