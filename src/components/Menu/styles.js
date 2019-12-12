import { drawerWidth } from '../../utils/Consts';

import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';
import orange from '@material-ui/core/colors/orange';
import pink from '@material-ui/core/colors/pink';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';

const styles = theme => ({
   root: {
      display: 'flex'
   },

   logo: {
		marginRight: '20px',
		height: '40px'
   },

   appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
         easing: theme.transitions.easing.sharp,
         duration: theme.transitions.duration.leavingScreen,
      }),
      backgroundColor: theme.palette.secondary.light
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
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
         width:theme.spacing(7) + 1,
      },
   },
   toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
   },
   userImg: {
      width: '1em',
      height: '1em',
      fontSize: '24px',
      borderRadius: '50%'
   },
   currentUserBg: {
		background: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.main} 15%, ${theme.palette.primary.dark} 100%)`
   },
   text: {
      color: theme.palette.primary.main
	},
	
	textSecondary: {
      color: theme.palette.secondary.contrastText
   },

   orange: {
      background: orange[500],
      color: "#000000"
   },
   purple: {
      background: purple[500],
      color: "#FFFFFF"
   },
   pink: {
      background: pink[500],
      color: "#FFFFFF"
   },
   green: {
      background: green[500],
      color: "#000000"
   },
   red: {
      background: red[500],
      color: "#FFFFFF"
   },
   blue: {
      background: blue[500],
      color: "#FFFFFF"
   }
});

export default styles;