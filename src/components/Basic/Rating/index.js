import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import RatingLab from '@material-ui/lab/Rating';
import Paper from '@material-ui/core/Paper';

import styles from './styles';
import theme from '../../../themes/default';

class Rating extends Component {
   render() {
      const { classes } = this.props;

      return (
         <Paper className={classNames(classes.root, classes.bg)}>
				<Grid container direction="row" justify="center" alignItems="center">
					<Typography variant="body2" align="center" className={classes.italic}>
						"{this.props.message}"
					</Typography>
				</Grid>
				<Grid container direction="row" justify="flex-end" alignItems="center" className={classes.mt10}>
					<Typography variant="subtitle2">
						De: {this.props.from}
					</Typography>
				</Grid>
				<Grid container direction="row" justify="flex-end" alignItems="center">
               <RatingLab name="read-only" value={this.props.stars} readOnly />
				</Grid>
			</Paper>
      )
   }
}

Rating.propTypes = {
   classes: PropTypes.object.isRequired,
   theme: PropTypes.object.isRequired,
	message: PropTypes.string.isRequired,
	stars: PropTypes.number.isRequired,
	from: PropTypes.string.isRequired
};

export default withStyles(styles(theme), { withTheme: true })(Rating)
