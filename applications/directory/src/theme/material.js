import { createTheme, responsiveFontSizes } from '@mui/material/styles';

//create a 'partial theme' which will be used in the actual theme below
const breakpointsVals = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 768,
      laptop: 1024,
      desktop: 1280,
      desktopLg: 1350,
    },
  },
});

const theme = responsiveFontSizes(
  createTheme(breakpointsVals, {
    palette: {
      primary: {
        main: '#be2926',
        text: 'rgba(0, 0, 0, 0.87)',
      },
      secondary: {
        main: '#8a9918',
        secondary: '#585481',
      },
    },
    typography: {
      h1: {
        fontFamily: 'brandon-grotesque, sans-serif',
      },
      h2: {
        fontFamily: 'brandon-grotesque, sans-serif',
      },
      h3: {
        fontFamily: 'brandon-grotesque, sans-serif',
      },
      h4: {
        fontFamily: 'brandon-grotesque, sans-serif',
      },
      h5: {
        fontFamily: 'brandon-grotesque, sans-serif',
      },
      h6: {
        fontFamily: 'brandon-grotesque, sans-serif',
      },
      body1: {
        fontFamily: 'gira-sans, sans-serif',
        fontSize: ['1rem', '1rem', '1rem', '1.5rem'],
      },
      body2: {
        fontFamily: 'brandon-grotesque, sans-serif',
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            paddingTop: 8 * 3,
            paddingBottom: 8 * 3,
            paddingLeft: 8 * 3,
            paddingRight: 8 * 3,
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            fontWeight: 'bold',
            letterSpacing: '1.25px',
            paddingLeft: '1.25rem',
            paddingRight: '1.25rem',
          },
        },
      },
    },
  })
);

export default theme;
