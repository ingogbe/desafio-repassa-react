import { lighten } from '@material-ui/core/styles';

const styles = theme => ({
   root: {
      width: '100%',
   },
   paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
   },
   table: {
      minWidth: 550,
   },
   margin0: {
      margin: 0
   },
   mt10: {
      marginTop: '10px'
   },
   tableWrapper: {
      overflowX: 'auto',
   },
   visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
   },
   cursorPointer: {
      cursor: 'pointer'
   },
   highlight:
      theme.palette.type === 'light'
         ? {
            color: theme.palette.primary.main,
            backgroundColor: lighten(theme.palette.primary.light, 0.85),
         }
         : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.primary.dark,
         },
   title: {
      flex: '1 1 100%',
      fontWeight: 'bold'
   },
});

export default styles;