const styles = theme => ({
   root: {
      height: '100vh',
   },
   main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing(3),
      marginRight: theme.spacing(3),
      [theme.breakpoints.up(400 + theme.spacing(3 * 2))]: {
         width: 400,
         marginLeft: 'auto',
         marginRight: 'auto',
      },
   },

   paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
   },

   form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(),
   },

   submit: {
      marginTop: theme.spacing(3),
   },

   logo: {
      width: '200px',
      margin: '30px'
   },

   mt10: {
      marginTop: '10px'
   }
});

export default styles;