import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: '#be2926'
      }
    },
    overrides: {
      //
    }
  })
);

export default theme;
