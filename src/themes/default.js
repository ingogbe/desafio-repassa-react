import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: será calculada com base em palette.primary.main,
      main: '#3ACBC7',
      // dark: será calculada com base em palette.primary.main,
      // contrastText: será calculada para contrastar com palette.primary.main
    },
    secondary: {
      main: '#EDEDED',
      dark: '#A9A9A9'
    },
    // error: irá usar a cor padrão
  },
  typography: {
   fontFamily: 'Raleway, Arial',
   h4: {
      fontWeight: 100,
    },
 },
});

export default theme;