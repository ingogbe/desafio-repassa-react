const styles = theme => ({
   root: {
      height: '100vh',
      padding: '20px'
   },
   image: {
      maxWidth: '200px'
   },
   title: {
		fontSize: '20px',
		fontWeight: 'bold',
		color: theme.palette.primary.main,
      marginBottom: "10px"
   },
   w100: {
      width: '100%'
   },
   button: {
      color: theme.palette.secondary.dark
   },
   logo: {
      width: '200px',
      margin: '30px'
   }
});

export default styles;