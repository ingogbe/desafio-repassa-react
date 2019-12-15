import React from 'react';
import PropTypes from 'prop-types';

// Material UI Components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import Button from '@material-ui/core/Button';

import { withStyles, ThemeProvider } from '@material-ui/core/styles';
import styles from './styles';
import theme from '../../themes/default';

class NotFound extends React.Component {

   render() {
      const { classes } = this.props;

      return (
         <ThemeProvider theme={theme}>
            <Grid container wrap="wrap" direction="row" justify="center" alignItems="center" className={classes.root}>
               <Grid item container wrap="wrap" direction="row" justify="center" alignItems="center">
                  <img alt="Repassa Logo" src="/images/logo.svg" className={classes.logo} />
                  <Typography variant="h4" gutterBottom>
                     ratings
                  </Typography>
               </Grid>
               <Grid item container wrap="wrap" direction="row" justify="center" alignItems="center">
                  <Grid item xs={12}>
                     <Typography variant="button" align="center" display="block" gutterBottom className={classes.title}>
                        Página não encontrada
                     </Typography>
                  </Grid>
                  <Grid item xs={12} container justify="center">
                     <img alt="404 - Not found" src="./images/error-404.svg" className={classes.image}/>
                  </Grid>
               </Grid>
               <Grid item container wrap="wrap" direction="row" justify="center" alignItems="center">
                  <Button href="/" startIcon={<KeyboardReturnIcon/>} size="large" className={classes.button}>
                     Voltar
                  </Button>
               </Grid>
            </Grid>
         </ThemeProvider>
      );
   }
}

NotFound.propTypes = {
   classes: PropTypes.object.isRequired
};

export default withStyles(styles(theme), { withTheme: true })(NotFound)
