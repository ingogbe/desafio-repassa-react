import React from 'react';
import PropTypes from 'prop-types';
import { withCookies } from 'react-cookie';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

// Material UI Components
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import styles from './styles';
import theme from '../../../themes/default';

import { remove } from '../../../actions/notification';

class Home extends React.Component {

   constructor(props) {
		super(props);
		
		this.state = {
			notifications: []
		}
   }
	
	static getDerivedStateFromProps(nextProps, prevState) {
		var notifications = [];
		
		Object.keys(nextProps.notifications).forEach(function (key) {
			var item = nextProps.notifications[key];
			notifications.push(item);
		});

      return {
			notifications: notifications
		};
	}
	
	handleClose = (id) => {
      this.props.remove(id);
	};
	
	renderNotification = (item, classes) => {
		return (
			<Grid item container key={item.id}>
				<Paper className={classnames(classes.notification, classes[item.type])}>
					<Grid container wrap="wrap" direction="row" justify="space-between" alignItems="center">
						<Grid item>
							<Typography variant="overline" display="block" className={classes.title}>
								{item.title}
							</Typography>
						</Grid>
						<Grid item>
							<Tooltip title="Fechar">
								<IconButton aria-label={"Fechar"} size="small" onClick={() => {this.handleClose(item.id)}}>
									<CloseIcon className={classes.icon}/>
								</IconButton>
							</Tooltip>
						</Grid>
					</Grid>
					<Typography variant="caption" display="block">
						{item.message}
					</Typography>
				</Paper>
			</Grid>
		)
	}

   render() {
		const { classes } = this.props;

      return (
			<Grid container wrap="wrap" direction="row" justify="flex-end" alignItems="flex-end" className={classes.root}>
				{this.state.notifications.map(item => (
					//TODO: Fade out
					this.renderNotification(item, classes)
				))}
			</Grid>
      );
   }
}

Home.propTypes = {
   classes: PropTypes.object.isRequired,
   theme: PropTypes.object.isRequired,
	notifications: PropTypes.object.isRequired,
	remove: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
   notifications: state.notifications
});

export default connect(mapStateToProps, {
	remove
})(withStyles(styles(theme), { withTheme: true })(withCookies(Home)));
