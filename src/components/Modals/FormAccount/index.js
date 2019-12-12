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

// Functions

import styles from './styles';
import theme from '../../../themes/default';

// Material UI Components
import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

class FormAccount extends Component {

	constructor(props) {
		super(props);

		this.state = {
			open: false,
			load: false,
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
		if (!prevState.load) {
			return {
				...prevState,
				load: true,
				form: {
					...prevState.form,
					fullname: nextProps.account.fullname,
					role: nextProps.role,
					email: nextProps.account.email
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
			load: false
		})
	};

	onSubmit = () => {
		if(this.props.type === "create"){
			//call create
		}
		else if(this.props.type === "edit"){
			//call edit
		}
		else {
			//DO NOTHING
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

	render() {
		const { classes } = this.props;
		const Icon = this.props.icon;

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
									<Typography variant="button" gutterBottom className={classes.title}>
										{this.props.title}
									</Typography>
									<Typography variant="button" gutterBottom className={classes.title}>
										<Tooltip title={this.props.title}>
											<IconButton aria-label={this.props.title} className={classes.margin0} onClick={this.handleClose}>
												<CloseIcon />
											</IconButton>
										</Tooltip>
									</Typography>
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
												<Button variant="contained" color="primary">
													Enviar
												</Button>
											</Grid>
										</Fragment>
									)}
								</form>
								{this.props.type === 'view' && (
									"Mostrar ratings aqui"
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
	account: PropTypes.object
};

FormAccount.defaultProps = {
	account: {
		fullname: "",
		email: ""
	}
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {})(withStyles(styles(theme), { withTheme: true })(FormAccount))
