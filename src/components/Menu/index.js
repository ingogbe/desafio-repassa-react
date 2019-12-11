import React, { Component, Fragment } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
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
import BuildMatUI from '@material-ui/icons/Build';
import MenuItemMatUI from '@material-ui/core/MenuItem';
import MenuMatUI from '@material-ui/core/Menu';
import AccountCircleMatUI from '@material-ui/icons/AccountCircle';
import SupervisorAccountMatUI from '@material-ui/icons/SupervisorAccount';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

import { drawerWidth } from '../../utils/Consts';

import { logout } from '../../actions/user';

const styles = theme => ({
   root: {
      display: 'flex'
   },

   evahLogo: {
      marginRight: '20px'
   },

   appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.leavingScreen,
      }),
      backgroundColor: '#333'
   },
   appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.enteringScreen,
      }),
   },
   menuButton: {
      marginLeft: 12,
      marginRight: 36,
   },
   hide: {
      display: 'none',
   },
   drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      float: 'left',
      position: 'absolute'
   },
   drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.enteringScreen,
      }),
   },
   drawerClose: {
      transition: theme.transitions.create('width', {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing.unit * 7 + 1,
      [theme.breakpoints.up('sm')]: {
         width: theme.spacing.unit * 7 + 1,
      },
   },
   toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
   },
   search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
         backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
         marginLeft: theme.spacing.unit,
         width: 'auto',
      },
   },
   searchIcon: {
      width: theme.spacing.unit * 9,
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
   },
   inputRoot: {
      color: 'inherit',
      width: '100%',
   },
   inputInput: {
      paddingTop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
         width: 120,
         '&:focus': {
            width: 200,
         },
      },
   },
   userImg: {
      width: '1em',
      height: '1em',
      fontSize: '24px',
      borderRadius: '50%'
   },
   currentUserBg: {
      backgroundImage: 'url("/images/blue_polygon.jpg")'
   },
   whiteText: {
      color: '#FFF'
   }
});

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
                     <MenuIconMatUI />
                  </IconButtonMatUI>
               
                  <Link underline="none" component={RouterLink} to="/">
                     <img alt="Evah Logo" src="/images/evah-inverse.png"/>
                  </Link>

                  <Grid container direction="row" justify="flex-end" alignItems="center">
                     <IconButtonMatUI aria-owns={open ? 'menu-appbar' : undefined} aria-haspopup="true" onClick={this.handleMenu} color="inherit" >
                        {this.props.user ? (
                           this.props.user.image ? 
                              <img alt="User avatar" className={classNames(classes.userImg)} src={this.props.user.image} onError={this.addDefaultSrc}/> :
                              <AccountCircleMatUI/>
                        ) : (
                           <AccountCircleMatUI/>
                        )}
                     </IconButtonMatUI>
                     <MenuMatUI id="menu-appbar" anchorEl={anchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right', }} transformOrigin={{ vertical: 'top', horizontal: 'right', }} open={open} onClose={this.handleClose} >
                        <MenuItemMatUI onClick={this.handleClose} disabled>{
                           this.props.user ? this.props.user.name : 'Carregando'
                        }</MenuItemMatUI>
                        <MenuItemMatUI onClick={this.handleClose} disabled>Minha conta</MenuItemMatUI>
                        <MenuItemMatUI onClick={this.props.logout}>Sair</MenuItemMatUI>
                     </MenuMatUI>
                  </Grid>
               </ToolbarMatUI>
            </AppBarMatUI>

            <DrawerMatUI variant="permanent" className={classNames(classes.drawer, { [classes.drawerOpen]: this.state.open, [classes.drawerClose]: !this.state.open, })} classes={{ paper: classNames({ [classes.drawerOpen]: this.state.open, [classes.drawerClose]: !this.state.open, }), }} open={this.state.open} >
               <div className={classNames(classes.currentUserBg)}>
                  <div className={classNames(classes.toolbar)} >
                     <IconButtonMatUI className={classes.whiteText} onClick={this.handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIconMatUI /> : <ChevronLeftIconMatUI />}
                     </IconButtonMatUI>
                  </div>
               </div>

               <DividerMatUI />

               <ListMatUI>
                  <Link underline="none" component={RouterLink} to="/">
                     <ListItemMatUI selected={pathname === '/' ? true : false} button>
                        <ListItemIconMatUI><div><HomeMatUI /></div></ListItemIconMatUI>
                        <ListItemTextMatUI primary={'Home'} />
                     </ListItemMatUI>
                  </Link>

                  {this.props.adminLoggedIn ? 
                     <Link underline="none" component={RouterLink} to="/supervision">
                        <ListItemMatUI selected={pathname === '/supervision' ? true : false} button>
                           <ListItemIconMatUI><div><SupervisorAccountMatUI /></div></ListItemIconMatUI>
                           <ListItemTextMatUI primary={'Supervisão'} />
                        </ListItemMatUI>
                     </Link>
                     : ""
                  }

                  {this.props.user.superAdmin ? 
                     <Link underline="none" component={RouterLink} to="/admin">
                        <ListItemMatUI selected={pathname === '/admin' ? true : false} button>
                           <ListItemIconMatUI><div><BuildMatUI /></div></ListItemIconMatUI>
                           <ListItemTextMatUI primary={'Administrar Clientes'} />
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
   currentClient: PropTypes.object.isRequired,
   user: PropTypes.object.isRequired,
   loggedIn: PropTypes.bool.isRequired,
   logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
   loggedIn: state.user.loggedIn,
   adminLoggedIn: state.user.adminLoggedIn,
   user: state.user.data
});

export default connect(mapStateToProps, {logout})(withStyles(styles, { withTheme: true })(Menu));