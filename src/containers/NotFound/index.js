import React from 'react';
import PropTypes from 'prop-types';

// Material UI Components
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
   fullScreen: {
      height: '100%',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textTransform: 'uppercase',
      fontFamily: "'Courier New', Courier, 'Lucida Sans Typewriter', 'Lucida Typewriter', monospace; font-size: 24px",
      fontWeight: 'bold',
      textAlign: 'center'
   }
});

class NotFound extends React.Component {

   render() {
      const { classes } = this.props;

      return (
         <div className={classes.fullScreen}>
            404<br/><br/>
            Página não encontrada
         </div>
      );
   }
}

NotFound.propTypes = {
   classes: PropTypes.object.isRequired,
   theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(NotFound)
