import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: '#be2926'
      }
    },
    breakpoints: {
      values: {
        mobile: 0,
        tablet: 768,
        laptop: 1024,
        desktop: 1440
      }
    },
    components: {
      MuiCard: {
        defaultProps: {
          elevation: 6
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            paddingTop: 8 * 3,
            paddingBottom: 8 * 3,
            paddingLeft: 8 * 3,
            paddingRight: 8 * 3
          }
        }
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true
        },
        styleOverrides: {
          root: {
            fontWeight: 'bold',
            letterSpacing: '1.25px',
            paddingLeft: '1.25rem',
            paddingRight: '1.25rem'
          }
        }
      }
    }
  })
);

export default theme;
