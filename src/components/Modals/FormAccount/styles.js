const styles = theme => ({
   root: {
      padding: theme.spacing(1, 3, 3, 3),
      outline: 'none',
      overflow: 'auto'
   },
   modalScroll: {
      overflow: 'auto',
      padding: '20px',
      maxHeight: "300px"
   },
   modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
   },
   title: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: theme.palette.primary.main,
      marginBottom: "10px"
   },
   ratings: {
      fontSize: '16px',
      color: theme.palette.primary.dark,
      marginBottom: "10px",
      textAlign: 'center'
   },
   mt10: {
      marginTop: '10px'
   }
});

export default styles;