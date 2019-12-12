import React from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { connect } from 'react-redux';

// My Components
import Menu from '../../components/Menu';
import FilterableTable from '../../components/Tables/FilterableTable';

// Material UI Components
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';
import theme from '../../themes/default';

import { listEmployees, batchDelete } from '../../actions/account';

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
      this.props.listEmployees(this.getCookies('__session'));
   }

   render() {
      const { classes } = this.props;

      return (
         <div className={classes.root}>

            <Menu />

            <main className={classes.content}>
               <div className={classes.toolbar} />

               <FilterableTable title="Funcionários" accounts={this.props.employees} deleteFunc={this.props.batchDelete} session={this.getCookies('__session')}/>
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
   listEmployees: PropTypes.func.isRequired,
   batchDelete: PropTypes.func.isRequired,
   employees: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
   rating: state.rating,
   ratingError: state.ratingError,
   user: state.user.data,
   employees: state.account.employees
});

export default connect(mapStateToProps, {
   listEmployees,
   batchDelete
})(withStyles(styles(theme), { withTheme: true })(withCookies(Home)));
