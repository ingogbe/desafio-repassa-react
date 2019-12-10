import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// My Components
import Menu from '../../components/Menu';

// Material UI Components
import { withStyles } from '@material-ui/core/styles';

// Styles
import { drawerWidth } from '../../utils/Consts';

const styles = theme => ({
   root: {
      display: 'flex',
   },
   toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
   },
   content: {
      left: `${drawerWidth}px`,
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
      paddingLeft: theme.spacing.unit * 10 + 1,
      width: `calc(100% - ${drawerWidth}px)`
   },
   cardName: {
      color: "#AAA",
      margin: 0,
      marginRight: '5px'
   },
   evahChip: {
      backgroundColor: 'rgb(0, 177, 255)',
      color: 'rgb(255, 255, 255)',
      borderRadius: '3px',
      padding: 0,
      lineHeight: '10px',
      height: '20px',
      fontSize: '12px'
   },
   mb2: {
      marginBottom: '2rem'
   },
   w100: {
      width: '100%'
   },
   h100: {
      height: '100%'
   },
   chartContainer: {
      position: 'relative',
      height: '150px',
      width: '100%'
   }
});


class Home extends React.Component {

   constructor(props) {
      super(props);

      this.state = {
         isMobile: window.innerWidth <= 600
      }
   }

   render() {
      const { classes } = this.props;

      return (
         <div className={classes.root}>

            <Menu />

            <main className={classes.content}>
               <div className={classes.toolbar} />


            </main>
         </div>
      );
   }
}

Home.propTypes = {
   classes: PropTypes.object.isRequired,
   theme: PropTypes.object.isRequired,
   loggedIn: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
   loggedIn: state.user.loggedIn,
   user: state.user.data
});

export default connect(mapStateToProps, {

})(withStyles(styles, { withTheme: true })(Home))
