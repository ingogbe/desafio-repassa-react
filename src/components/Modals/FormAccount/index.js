import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import RateReviewIcon from '@material-ui/icons/RateReview';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import classnames from 'classnames';

import FormRating from '../FormRating';

import Rating from '../../Basic/Rating';

import { 
   list as listRating, 
   create as createRating, 
   update as editRating,
   exclude as deleteRate
} from '../../../actions/ratings';

// Functions
import styles from './styles';
import theme from '../../../themes/default';
import { isEmpty } from '../../../utils/Functions';

// Material UI Components
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

class FormAccount extends Component {

   constructor(props) {
      super(props);

      this.state = {
         open: false,
         showPassword: false,
         form: {
            fullname: "",
            password: "",
            email: "",
            role: ""
         }
      }
   }

   static getDerivedStateFromProps(nextProps, prevState) {
      if (!prevState.open) {
         return {
            ...prevState,
            form: {
               password: "",
               fullname: nextProps.account ? nextProps.account.fullname : "",
               role: nextProps.role,
               email: nextProps.account ? nextProps.account.email : ""
            }
         }
      }

      return prevState;
   }

   handleOpen = () => {
      this.setState({
         open: true
      });

      if (this.props.type === "view") {
         this.props.listRating(this.props.account.id);
      }
   };

   handleClose = () => {
      this.setState({
         open: false,
      })
   };

   onSubmit = (e) => {
      e.preventDefault();

      this.setState({
         open: false,
      });

      if (this.props.type === "create") {
         this.props.submitFunct(this.state.form);
      }
      else if (this.props.type === "edit") {
         this.props.submitFunct(this.props.account.id, this.state.form);
      }
   }

   onChange = (e) => {
      let target = e.currentTarget;

      this.setState(prevState => ({
         ...prevState,
         form: {
            ...prevState.form,
            [target.name]: target.value
         }
      }));
   }

   handleClickShowPassword = () => {
      this.setState({
         showPassword: !this.state.showPassword
      });
   };

   handleMouseDownPassword = event => {
      event.preventDefault();
   };

   deleteRating = (accId, rateId) => {
      this.props.deleteRate(accId, rateId);
   }

   render() {
      const { classes } = this.props;
      const Icon = this.props.icon;

      var hasRatings = false;
      var ratings = []

      if (this.props.type === 'view') {
         if (this.props.account) {
            var accountRatings = this.props.rating[this.props.account.id];

            if (!isEmpty(accountRatings)) {
               hasRatings = true;

               Object.keys(accountRatings).forEach(function (key) {
                  ratings.push(accountRatings[key]);
               });
            }
         }
      }

      return (
         <Fragment>
            <ThemeProvider theme={theme}>
               <Tooltip title={this.props.title}>
                  <IconButton aria-label={this.props.title} className={classes.margin0} onClick={this.handleOpen}>
                     <Icon />
                  </IconButton>
               </Tooltip>

               <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  className={classes.modal}
                  open={this.state.open}
                  onClose={this.handleClose}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                     timeout: 500,
                  }}
               >
                  <Fade in={this.state.open}>
                     <Paper className={classes.root}>
                        <Grid container direction="row" justify="space-between" alignItems="center" className={classes.mt10}>
                           <Grid item>
                              <Typography variant="button" gutterBottom className={classes.title}>
                                 {this.props.title}
                              </Typography>
                           </Grid>
                           <Grid item>
                              {this.props.type === 'view' && (
                                 <FormRating title="Avaliar" icon={RateReviewIcon} type="create" submitFunct={this.props.createRating} accountId={this.props.account.id}/>
                              )}
                              <Typography variant="button" gutterBottom className={classes.title}>
                                 <Tooltip title="Fechar">
                                    <IconButton aria-label={this.props.title} className={classes.margin0} onClick={this.handleClose}>
                                       <CloseIcon />
                                    </IconButton>
                                 </Tooltip>
                              </Typography>
                           </Grid>
                        </Grid>

                        <form onSubmit={this.onSubmit}>
                           <FormControl fullWidth color="primary" margin="normal">
                              <InputLabel htmlFor="fullname">Nome Completo</InputLabel>
                              <Input disabled={this.props.type === 'view' ? true : false} id="fullname" name="fullname" value={this.state.form.fullname} onChange={this.onChange} />
                           </FormControl>
                           <FormControl fullWidth color="primary" margin="normal">
                              <InputLabel htmlFor="email">E-Mail</InputLabel>
                              <Input disabled={this.props.type === 'view' ? true : false} id="email" name="email" value={this.state.form.email} onChange={this.onChange} />
                           </FormControl>
                           {this.props.type !== 'view' && (
                              <Fragment>
                                 <FormControl fullWidth color="primary" margin="normal">
                                    <InputLabel htmlFor="password">Password</InputLabel>
                                    <Input
                                       id="password"
                                       name="password"
                                       type={this.state.showPassword ? 'text' : 'password'}
                                       value={this.state.form.password}
                                       onChange={this.onChange}
                                       endAdornment={
                                          <InputAdornment position="end">
                                             <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={this.handleClickShowPassword}
                                                onMouseDown={this.handleMouseDownPassword}
                                             >
                                                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                             </IconButton>
                                          </InputAdornment>
                                       }
                                    />
                                 </FormControl>
                                 <Grid container direction="row" justify="flex-end" alignItems="center" className={classes.mt10}>
                                    <Button type="submit" variant="contained" color="primary">
                                       Enviar
												</Button>
                                 </Grid>
                              </Fragment>
                           )}
                        </form>

                        {hasRatings ? (
                           <Fragment>
                              <Grid container spacing={1} wrap="wrap" direction="row" justify="center" alignItems="center" className={classnames(classes.mt10, classes.modalScroll)}>
                              {ratings.map(item => (
                                 <Grid item key={item.id}>
                                    <Grid container direction="row" justify="center" alignItems="center" className={classes.mt10}>
                                       <Rating
                                          from={item.from}
                                          message={item.message}
                                          stars={item.stars}/>
                                    </Grid>
                                    <Grid container direction="row" justify="center" alignItems="center" className={classes.mt10}>
                                       <FormRating title="Editar avaliação" icon={EditIcon} type="edit" submitFunct={this.props.editRating} accountId={this.props.account.id} rating={item}/>
                                       <Tooltip title="Deletar avaliação">
                                          <IconButton aria-label="Deletar avaliação" className={classes.margin0} onClick={() => this.deleteRating(this.props.account.id, item.id)}>
                                             <DeleteIcon />
                                          </IconButton>
                                       </Tooltip>
                                    </Grid>
                                 </Grid>
                              ))}
                              </Grid>
                           </Fragment>
                        ) : (
                              <Grid container direction="row" justify="center" alignItems="center" className={classes.mt10}>
                                 <Typography variant="button" gutterBottom className={classes.ratings}>
                                    Não possui avaliações
                              </Typography>
                              </Grid>
                           )}
                     </Paper>
                  </Fade>
               </Modal>
            </ThemeProvider>
         </Fragment>
      );
   }
}

FormAccount.propTypes = {
   classes: PropTypes.object.isRequired,
   theme: PropTypes.object.isRequired,
   icon: PropTypes.elementType.isRequired,
   type: PropTypes.string.isRequired,
   role: PropTypes.string.isRequired,
   title: PropTypes.string.isRequired,
   account: function (props, propName, componentName) {
      if (((props['type'] === "edit") || (props['type'] === "view")) &&
         (props[propName] === undefined || typeof (props[propName]) !== 'object')) {
         return new Error(`Invalid prop '${propName}' of type '${typeof (props[propName])}' supplied to '${componentName}', expected 'object'. This prop is required when type is 'edit' or 'view'`);
      }
   },
   submitFunct: function (props, propName, componentName) {
      if (((props['type'] === "edit") || (props['type'] === "create")) &&
         (props[propName] === undefined || typeof (props[propName]) !== 'function')) {
         return new Error(`Invalid prop '${propName}' of type '${typeof (props[propName])}' supplied to '${componentName}', expected 'function'. This prop is required when type is 'edit' or 'create'`);
      }
   },
   listRating: PropTypes.func.isRequired,
   createRating: PropTypes.func.isRequired,
   editRating: PropTypes.func.isRequired,
   deleteRate: PropTypes.func.isRequired,
   rating: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
   rating: state.rating.listByAccount
});

export default connect(mapStateToProps, {
   listRating,
   createRating,
   editRating,
   deleteRate
})(withStyles(styles(theme), { withTheme: true })(FormAccount))
