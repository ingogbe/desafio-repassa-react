import React from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { connect } from 'react-redux';

// My Components
import Menu from '../../components/Menu';
import Ratings from '../../components/Cards/Ratings';

// Material UI Components
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';
import theme from '../../themes/default';
import {list as listRating} from '../../actions/ratings';

class Home extends React.Component {

   constructor(props) {
      super(props);

      this.state = {
         isMobile: window.innerWidth <= 600
      }
   }

   getCookies = (cookieName) => {
      const { cookies } = this.props.cookies;
      return cookies[cookieName];
   };

   componentDidMount() {
      this.props.listRating(this.props.user.id);
   }

   render() {
      const { classes } = this.props;

      return (
         <div className={classes.root}>

            <Menu />

            <main className={classes.content}>
               <div className={classes.toolbar} />

               <Ratings/>
            </main>
         </div>
      );
   }
}

Home.propTypes = {
   classes: PropTypes.object.isRequired,
   theme: PropTypes.object.isRequired,
   cookies: instanceOf(Cookies).isRequired,
   rating: PropTypes.object.isRequired,
   ratingError: PropTypes.object.isRequired,
   user: PropTypes.object.isRequired,
   listRating: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
   rating: state.rating,
   ratingError: state.ratingError,
   user: state.user.data
});

export default connect(mapStateToProps, {
   listRating 
})(withStyles(styles(theme), { withTheme: true })(withCookies(Home)));
