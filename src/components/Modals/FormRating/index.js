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
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

// Functions
import styles from './styles';
import theme from '../../../themes/default';

// Material UI Components
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

class FormRating extends Component {

   constructor(props) {
      super(props);

      this.state = {
         open: false,
         showPassword: false,
         form: {
            message: "",
            stars: 0,
            from: ""
         }
      }
   }

   static getDerivedStateFromProps(nextProps, prevState) {
      if (!prevState.open) {
         return {
            ...prevState,
            form: {
               message: nextProps.rating ? nextProps.rating.message : "",
               stars: nextProps.rating ? nextProps.rating.stars : 0,
               from: nextProps.user
            }
         }
      }

      return prevState;
   }

   handleOpen = () => {
      this.setState({
         open: true
      });
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
         this.props.submitFunct(this.props.accountId, {
            message: this.state.form.message,
            stars: this.state.form.stars
         });
      }
      else if (this.props.type === "edit") {
         this.props.submitFunct(
            this.props.accountId, 
            this.props.rating.id,
            {
               message: this.state.form.message,
               stars: this.state.form.stars
            }
         );
      }

      
   }

   onChange = (e) => {
      var target = e.currentTarget;
      var value;
      
      if(target.name === "stars") {
         value = Number(target.value);
      }
      else {
         value = target.value;
      }

      this.setState(prevState => ({
         ...prevState,
         form: {
            ...prevState.form,
            [target.name]: value
         }
      }));
   }

   render() {
      const { classes } = this.props;
      const Icon = this.props.icon;

      console.log(this.state);

      return (
         <Fragment>
            <ThemeProvider theme={theme}>
               <Tooltip title={this.props.title}>
                  <Button
                     variant="contained" color="primary" className={classes.margin0} onClick={this.handleOpen} endIcon={<Icon />}>
                     {this.props.title}
                  </Button>
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
                           <FormControl fullWidth color="primary" margin="dense">
                              <Rating
                                 disabled={this.props.type === 'view' ? true : false}
                                 id="stars" name="stars"
                                 value={this.state.form.stars}
                                 onChange={this.onChange}
                              />
                           </FormControl>
                           <FormControl fullWidth color="primary" margin="dense">
                              <TextareaAutosize disabled={this.props.type === 'view' ? true : false} id="message" name="message" value={this.state.form.message} onChange={this.onChange} aria-label="minimum height" rows={6} placeholder="Escreva sua avaliação aqui" />
                              
                              {/* <Input disabled={this.props.type === 'view' ? true : false} id="message" name="message" value={this.state.form.message} onChange={this.onChange} /> */}
                           </FormControl>
                           <Grid container direction="row" justify="flex-end" alignItems="center" className={classes.mt10}>
                              <Button type="submit" variant="contained" color="primary">
                                 Enviar
                              </Button>
                           </Grid>
                        </form>
                     </Paper>
                  </Fade>
               </Modal>
            </ThemeProvider>
         </Fragment>
      );
   }
}

FormRating.propTypes = {
   classes: PropTypes.object.isRequired,
   theme: PropTypes.object.isRequired,
   icon: PropTypes.elementType.isRequired,
   type: PropTypes.string.isRequired,
   title: PropTypes.string.isRequired,
   accountId: PropTypes.string.isRequired,
   rating: function (props, propName, componentName) {
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
   }
};

const mapStateToProps = state => ({
   user: state.user.data.fullname
});

export default connect(mapStateToProps, {})(withStyles(styles(theme), { withTheme: true })(FormRating))
