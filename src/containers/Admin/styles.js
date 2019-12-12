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
      padding: theme.spacing(3),
      paddingLeft: theme.spacing(10) + 1,
      width: `calc(100% - ${drawerWidth}px)`
   }
});

export default styles;