import React, { Component, Fragment } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import DrawerMatUI from '@material-ui/core/Drawer';
import AppBarMatUI from '@material-ui/core/AppBar';
import ToolbarMatUI from '@material-ui/core/Toolbar';
import ListMatUI from '@material-ui/core/List';
import CssBaselineMatUI from '@material-ui/core/CssBaseline';
import DividerMatUI from '@material-ui/core/Divider';
import IconButtonMatUI from '@material-ui/core/IconButton';
import MenuIconMatUI from '@material-ui/icons/Menu';
import ChevronLeftIconMatUI from '@material-ui/icons/ChevronLeft';
import ChevronRightIconMatUI from '@material-ui/icons/ChevronRight';
import ListItemMatUI from '@material-ui/core/ListItem';
import ListItemIconMatUI from '@material-ui/core/ListItemIcon';
import ListItemTextMatUI from '@material-ui/core/ListItemText';
import HomeMatUI from '@material-ui/icons/Home';
import MenuItemMatUI from '@material-ui/core/MenuItem';
import MenuMatUI from '@material-ui/core/Menu';
import AccountCircleMatUI from '@material-ui/icons/AccountCircle';
import SupervisorAccountMatUI from '@material-ui/icons/SupervisorAccount';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

import { logout } from '../../actions/user';
import styles from './styles';
import theme from '../../themes/default';

class Menu extends Component {
   constructor(props) {
      super(props);

      this.state = {
         open: false,
         anchorEl: null
      };
   }

   handleDrawerOpen = () => {
      this.setState({ open: true });
   };

   handleDrawerClose = () => {
      this.setState({ open: false });
   };

   handleChange = event => {
      this.setState({ auth: event.target.checked });
   };

   handleMenu = event => {
      this.setState({ anchorEl: event.currentTarget });
   };

   handleClose = () => {
      this.setState({ anchorEl: null });
   };

   addDefaultSrc = (ev) => {
      ev.target.src = '/images/no-photo.jpg'
   }

   render() {
      const { classes, theme } = this.props;

      const { anchorEl } = this.state;
      const open = Boolean(anchorEl);

      const pathname = window.location.pathname;

      return (
         <Fragment>
            <CssBaselineMatUI />
            <AppBarMatUI position="fixed" className={classNames(classes.appBar, { [classes.appBarShift]: this.state.open, })}>
               <ToolbarMatUI disableGutters={!this.state.open}>
                  <IconButtonMatUI color="inherit" aria-label="Open drawer" onClick={this.handleDrawerOpen} className={classNames(classes.menuButton, { [classes.hide]: this.state.open, })} >
                     <MenuIconMatUI className={classes.text}/>
                  </IconButtonMatUI>
               
                  <Link underline="none" component={RouterLink} to="/">
                     <img alt="Logo" className={classes.logo} src="/images/logo.svg"/>
                  </Link>

                  <Grid container direction="row" justify="flex-end" alignItems="center">
                     <IconButtonMatUI aria-owns={open ? 'menu-appbar' : undefined} aria-haspopup="true" onClick={this.handleMenu} color="inherit" >
                        {this.props.user ? (
                           this.props.user.image ? 
                              <img alt="User avatar" className={classNames(classes.userImg)} src={this.props.user.image} onError={this.addDefaultSrc}/> :
                              <AccountCircleMatUI className={classes.text}/>
                        ) : (
                           <AccountCircleMatUI/>
                        )}
                     </IconButtonMatUI>
                     <MenuMatUI id="menu-appbar" anchorEl={anchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right', }} transformOrigin={{ vertical: 'top', horizontal: 'right', }} open={open} onClose={this.handleClose} >
                        <MenuItemMatUI onClick={this.handleClose} disabled>{
                           this.props.user ? this.props.user.fullname : 'Carregando'
                        }</MenuItemMatUI>
                        <MenuItemMatUI onClick={this.props.logout}>Sair</MenuItemMatUI>
                     </MenuMatUI>
                  </Grid>
               </ToolbarMatUI>
            </AppBarMatUI>

            <DrawerMatUI variant="permanent" className={classNames(classes.drawer, { [classes.drawerOpen]: this.state.open, [classes.drawerClose]: !this.state.open, })} classes={{ paper: classNames({ [classes.drawerOpen]: this.state.open, [classes.drawerClose]: !this.state.open, }), }} open={this.state.open} >
               <div className={classNames(classes.currentUserBg)}>
                  <div className={classNames(classes.toolbar)} >
                     <IconButtonMatUI className={classes.text} onClick={this.handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIconMatUI /> : <ChevronLeftIconMatUI />}
                     </IconButtonMatUI>
                  </div>
               </div>

               <DividerMatUI />

               <ListMatUI>
                  <Link underline="none" component={RouterLink} to="/">
                     <ListItemMatUI selected={pathname === '/' ? true : false} button>
                        <ListItemIconMatUI className={classes.text}><div><HomeMatUI /></div></ListItemIconMatUI>
                        <ListItemTextMatUI className={classes.textSecondary} primary={'Home'} />
                     </ListItemMatUI>
                  </Link>

                  {this.props.adminLoggedIn ? 
                     <Link underline="none" component={RouterLink} to="/admin">
                        <ListItemMatUI selected={pathname === '/admin' ? true : false} button>
                           <ListItemIconMatUI className={classes.text}><div><SupervisorAccountMatUI /></div></ListItemIconMatUI>
                           <ListItemTextMatUI className={classes.textSecondary} primary={'Administrador'} />
                        </ListItemMatUI>
                     </Link>
                     : ""
                  }


                  
               </ListMatUI>

            </DrawerMatUI>
         </Fragment>
      )
   }
}

Menu.propTypes = {
   user: PropTypes.object.isRequired,
   loggedIn: PropTypes.bool.isRequired,
   logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
   loggedIn: state.user.loggedIn,
   adminLoggedIn: state.user.adminLoggedIn,
   user: state.user.data
});

export default connect(mapStateToProps, {logout})(withStyles(styles(theme), { withTheme: true })(Menu));