import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: '#be2926',
        text: 'rgba(0, 0, 0, 0.87)'
      },
      secondary: {
        main: '#8a9918'
      }
    },
    typography: {
      body1: {
        fontFamily: ['gira-sans', 'sans-serif'].join(',')
      },
      body2: {
        fontFamily: ['brandon-grotesque', 'sans-serif'].join(',')
      }
    },
    breakpoints: {
      values: {
        mobile: 0,
        tablet: 768,
        laptop: 1024,
        desktop: 1280
      }
    },
    components: {
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
// fontFamily: ['brandon-grotesque', 'sans-serif'].join(',')
