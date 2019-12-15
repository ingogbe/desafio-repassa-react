const styles = theme => ({
   root: {
		position: 'fixed',
		maxWidth: '210px',
		padding: '5px',
		bottom: 0,
		right: 0
	},
	
	notification: {
		maxWidth: '200px',
		width: '200px',
		padding: '5px'
	},

	success: {
		backgroundColor: '#b1edab',
		color: '#3d8a36'
	},

	error: {
		backgroundColor: '#edabab',
		color: '#b53131'
	},

	title: {
		fontWeight: 'bold',
		textTransform: 'uppercase',
		margin: 0,
		padding: 0
	},

	icon: {
		width: '15px',
		height: '15px'
	}
});

export default styles;