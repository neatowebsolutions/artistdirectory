// mui default themes

import { createTheme, responsiveFontSizes } from '@mui/material/styles';

//create a 'partial theme' which will be used in the actual theme below
const breakpointsVals = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 768, // 48em
      tabletLg: 1024, // 64em
      desktop: 1440, //  90em
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
        [breakpointsVals.breakpoints.up('mobile')]: {
          fontSize: 24,
        },
        [breakpointsVals.breakpoints.between('tablet', 'tabletLg')]: {
          fontSize: 48,
          // letterSpacing: '0.5',
          lineHeight: '1.17',
        },
        [breakpointsVals.breakpoints.up('tabletLg')]: {
          fontSize: 60,
          lineHeight: '1.2',
        },
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
      // font-size is 16px
      body1: {
        fontFamily: 'gira-sans, sans-serif',
        [breakpointsVals.breakpoints.up('mobile')]: {
          fontSize: 14,
        },
        [breakpointsVals.breakpoints.between('tablet', 'tabletLg')]: {
          fontSize: 16,
          letterSpacing: 0.5,
          lineHeight: 1.5,
        },
        [breakpointsVals.breakpoints.up('tabletLg')]: {
          fontSize: 18,
          letterSpacing: 0.5,
          lineHeight: 1.6,
        },
        [breakpointsVals.breakpoints.up('desktop')]: {
          fontSize: 20,
        },
      },
      //  font size is 14
      body2: {
        fontFamily: 'brandon-grotesque, sans-serif',
        [breakpointsVals.breakpoints.up('tablet')]: {
          fontSize: 16,
          // lineHeight: '1.5',
        },
        [breakpointsVals.breakpoints.up('tabletLg')]: {
          fontSize: 18,
          // lineHeight: '1.6',
        },
      },
      // font size is 14
      body3: {
        fontFamily: 'brandon-grotesque, sans-serif',
        [breakpointsVals.breakpoints.up('tablet')]: {
          fontSize: 12,
          // lineHeight: '1.5',
        },
        [breakpointsVals.breakpoints.up('tabletLg')]: {
          fontSize: 14,
          // lineHeight: '1.6',
        },
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
      MuiTypography: {
        variants: [
          {
            props: {
              variant: 'body3',
            },
            style: {
              fontSize: 16,
            },
          },
        ],
      },
    },
  })
);

export default theme;
