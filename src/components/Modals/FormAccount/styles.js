const styles = theme => ({
	root: {
		padding: theme.spacing(1, 3, 3, 3),
		outline: 'none'
	},
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: '20px',
		fontWeight: 'bold',
		color: theme.palette.primary.main,
		marginBottom: "10px"
	},
	mt10: {
		marginTop: '10px'
	}
});

export default styles;