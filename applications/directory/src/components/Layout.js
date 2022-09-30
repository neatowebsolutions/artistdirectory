import React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';
import Toolbar from './Toolbar';

const Intro = ({ children }) => (
  <Box sx={{ textAlign: 'center', margin: '0rem auto' }}>
    <section>{children}</section>
  </Box>
);

const Root = ({ children }) => (
  <Box
    sx={{
      maxWidth: 1064,
      margin: '0 auto'
    }}
  >
    <section>{children}</section>
  </Box>
);

Intro.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

const Layout = ({ children }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      overflowX: 'hidden'
      minHeight: '100vh',
      maxWidth: ['90%', '90%', '90%', '1180px', '1280px'],
      margin: '0 auto',
      '& main': {
        flex: 1
      },
      '& p': {
        fontSize: [14, 16, 20]
      }
    }}
  >
    <Box>
      <Toolbar />
      <Header />
    </Box>

    <Box
      component="main"
      sx={{
        backgroundColor: '#fcfcfc',
        marginTop: '3px'
      }}
    >
      <Box
        sx={{
          maxWidth: ['95%', '95%', '95%', '1180px', '1280px'],
          margin: ' 0 auto'
        }}
      >
        {children}
      </Box>
    </Box>
    <Footer />
  </Box>
);

Layout.Intro = Intro;
Layout.Root = Root;

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
