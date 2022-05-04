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
  spacing: [0, 4, 8, 16, 24, 32, 64],
  palette: {
    primary: {
      main: '#be2926',
      text: 'rgba(0, 0, 0, 0.87)'
    },
    secondary: {
      main: '#8a9918',
      secondary: '#585481'
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
  fontFamily: 'brandon-grotesque, sans-serif'

  // TODO
};

theme.typography.h3 = {
  fontFamily: 'brandon-grotesque, sans-serif'

  // TODO
};

theme.typography.h4 = {
  fontFamily: 'brandon-grotesque, sans-serif'

  // TODO
};

theme.typography.h5 = {
  fontFamily: 'brandon-grotesque, sans-serif'

  // TODO
};

theme.typography.h6 = {
  fontFamily: 'brandon-grotesque, sans-serif'

  // TODO
};

theme.typography.body1 = {
  fontFamily: 'gira-sans, sans-serif',
  fontSize: ['1rem', '1rem', '1rem', '1.5rem']

  // TODO
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
      fontWeight: 'bold',
      letterSpacing: '1.25px',
      paddingLeft: '1.25rem',
      paddingRight: '1.25rem'
    }
  }
};

export default theme;
