import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import styles from './styles';
import theme from '../../themes/default';

class ErrorMessage extends Component {
   chooseClassName = (errorType, classes) => {
      switch(errorType) {
         case 'warning':
            return classes.colorWarning;
         case 'error':
            return classes.colorError;
         default:
            return '';
      }
   }

   render() {
      const { classes } = this.props;

      return (
         <Typography className={this.chooseClassName(this.props.error.type, classes)}>
            {this.props.error.message}
         </Typography>
      )
   }
}

ErrorMessage.propTypes = {
   classes: PropTypes.object.isRequired,
   theme: PropTypes.object.isRequired,
   error: PropTypes.object.isRequired
};

export default withStyles(styles(theme), { withTheme: true })(ErrorMessage)
