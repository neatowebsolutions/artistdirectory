// The type system - https://material.io/design/typography/the-type-system.html#applying-the-type-scale
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 768,
      laptop: 1024,
      desktop: 1440
    }
  },
  // spacing: [0, 4, 8, 16, 24, 32, 64],
  palette: {
    primary: {
      main: '#be2926',
      text: 'rgba(0, 0, 0, 0.87)',
      light: 'rgba(190, 41, 38, 0.1)'
    },
    secondary: {
      main: '#8a9918',
      secondary: '#585481'
    },
    success: {
      main: '#7f8d16'
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.85)',
      secondary: 'rgba(0, 0, 0, 0.6)'
    }
  }
});

theme.typography.h1 = {
  fontFamily: 'brandon-grotesque, sans-serif',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  lineHeight: '1',
  letterSpacing: '0.18px',

  [theme.breakpoints.up('tablet')]: {
    fontSize: '3rem',
    lineHeight: '1.17',
    letterSpacing: 'normal'
  },
  [theme.breakpoints.up('laptop')]: {
    fontSize: '3.75rem',
    lineHeight: '1.2',
    letterSpacing: '-0.5px'
  }
};

theme.typography.h2 = {
  fontFamily: 'brandon-grotesque, sans-serif',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  lineHeight: 1.17,
  letterSpacing: '0.18',
  [theme.breakpoints.up('tablet')]: {
    fontSize: '1.5rem',
    lineHeight: '1'
  }
};

theme.typography.h3 = {
  fontFamily: 'brandon-grotesque, sans-serif',
  fontSize: '1.25rem',
  lineHeight: 1.2,
  letterSpacing: 0.15,
  fontStyle: 'normal',
  [theme.breakpoints.up('tablet')]: {
    fontSize: '1.5rem',
    lineHeight: 1.4
  },
  [theme.breakpoints.up('laptop')]: {
    fontSize: '2rem',
    lineHeight: 1.6
  },
  [theme.breakpoints.up('desktop')]: {
    fontSize: '2.125rem'
  }

  // TODO
};

theme.typography.h4 = {
  fontFamily: 'brandon-grotesque, sans-serif',
  fontSize: '1rem'
  // TODO
};

theme.typography.h5 = {
  fontFamily: 'brandon-grotesque, sans-serif',
  lineHeight: 1,
  letterSpacing: '0.18px'
  // TODO
};

theme.typography.h6 = {
  fontFamily: 'brandon-grotesque, sans-serif',
  lineHeight: 1.2,
  letterSpacing: '0.15px'
  // TODO
};

theme.typography.body1 = {
  fontFamily: 'gira-sans, sans-serif',
  fontSize: '0.875rem',
  fontWeight: 'normal', // 500,
  lineHeight: 1.43,
  letterSpacing: 'normal',
  [theme.breakpoints.up('tablet')]: {
    fontSize: '1rem',
    lineHeight: '1.5',
    letterSpacing: '0.5px'
  },
  [theme.breakpoints.up('laptop')]: {
    fontSize: '1.25rem',
    lineHeight: '1.6',
    letterSpacing: '0.15px'
  },
  [theme.breakpoints.up('desktop')]: {
    fontSize: '1.5rem'
  }
};

theme.typography.body2 = {
  fontFamily: 'brandon-grotesque, sans-serif'

  // TODO
};

theme.components.MuiPaper = {
  styleOverrides: {
    root: {
      padding: theme.spacing(4)
    }
  }
};

theme.components.MuiButton = {
  defaultProps: {
    disableElevation: true
  },
  styleOverrides: {
    root: {
      height: '2.25rem',
      fontFamily: 'gira-sans, sans-serif',
      fontWeight: 'bold',
      lineHeight: 1.14,
      letterSpacing: '1.25px',
      paddingLeft: '1rem',
      paddingRight: '1rem'
    }
  }
};

export default theme;

/*

const theme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: 'pink',
          color: 'red',
          border: '1px solid #dadde9',
        },
      },
    },
  },
});




  transition:
                   'opacity cubic-bezier(0.4, 0, 0.2, 1) 6000ms  width cubic-bezier(0.4, 0, 0.2, 1) 6000ms background-color cubic-bezier(0.4, 0, 0.2, 1) 6000ms !important',

*/
