import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes, { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import Loader from '../../components/Loaders/Round';

import { connect } from 'react-redux';

import { login, validateSession } from '../../actions/user';

const styles = theme => ({
   main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
         width: 400,
         marginLeft: 'auto',
         marginRight: 'auto',
      },
   },
   paper: {
      marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
   },
   avatar: {
      margin: theme.spacing.unit,
      backgroundColor: theme.palette.secondary.main,
   },
   form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing.unit,
   },
   submit: {
      marginTop: theme.spacing.unit * 3,
   },
});

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
      const { classes, loggedIn } = this.props;
      const { loading } = this.state;

      return loggedIn ? (
         <Redirect to="/"/>
      ) : (
         <main className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper}>
               <img alt="Evah Logo" src="/images/evah.png" style={{ width: '200px', margin: '30px' }} />
               <Typography component="h1" variant="h5">
                  APP
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
                  <Button disabled={loading} type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
                     Entrar
                  </Button>
                  <FormControl margin="normal" required fullWidth style={!loading ? {display: 'none'} : {display: 'block'}}>
                     <Grid container direction="row" justify="center" alignItems="center"><Loader/></Grid>
                  </FormControl>
               </form>
            </Paper>
         </main>
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
   currentClient: state.client.currentClient,
   userError: state.userError
});

export default connect(mapStateToProps, { login, validateSession })(withStyles(styles)(withCookies(Login)));