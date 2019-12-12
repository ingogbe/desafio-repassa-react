import React from 'react';
import PropTypes from 'prop-types';
import { withCookies } from 'react-cookie';
import { connect } from 'react-redux';

// My Components
import Menu from '../../components/Menu';
import FilterableTable from '../../components/Tables/FilterableTable';

// Material UI Components
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';
import theme from '../../themes/default';

import { listEmployees, listAdmins, batchDelete, create, update } from '../../actions/account';

class Home extends React.Component {

   constructor(props) {
      super(props);

      this.state = {
         isMobile: window.innerWidth <= 600
      }
   }

   componentDidMount() {
      this.props.listEmployees();
      this.props.listAdmins();
   }

   render() {
      const { classes } = this.props;

      return (
         <div className={classes.root}>

            <Menu />

            <main className={classes.content}>
               <div className={classes.toolbar} />

               <FilterableTable 
                  title="Funcionários" 
                  role="employee"
                  accounts={this.props.employees} 
                  deleteFunc={this.props.batchDelete} 
                  createFunc={this.props.create}
                  editFunc={this.props.update}/>

               <FilterableTable 
                  title="Administradores" 
                  role="admin"
                  accounts={this.props.admins} 
                  deleteFunc={this.props.batchDelete} 
                  createFunc={this.props.create}
                  editFunc={this.props.update}/>
            </main>
         </div>
      );
   }
}

Home.propTypes = {
   classes: PropTypes.object.isRequired,
   theme: PropTypes.object.isRequired,
   rating: PropTypes.object.isRequired,
   ratingError: PropTypes.object.isRequired,
   user: PropTypes.object.isRequired,
   listEmployees: PropTypes.func.isRequired,
   listAdmins: PropTypes.func.isRequired,
   batchDelete: PropTypes.func.isRequired,
   update: PropTypes.func.isRequired,
   create: PropTypes.func.isRequired,
   employees: PropTypes.object.isRequired,
   admins: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
   rating: state.rating,
   ratingError: state.ratingError,
   user: state.user.data,
   employees: state.account.employees,
   admins: state.account.admins
});

export default connect(mapStateToProps, {
   listEmployees,
   listAdmins,
   batchDelete,
   create,
   update
})(withStyles(styles(theme), { withTheme: true })(withCookies(Home)));
