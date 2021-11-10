import React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Header from './Header';
import Toolbar from './Toolbar';

const Intro = ({ children }) => (
  <Box sx={{ textAlign: 'center', margin: '2.5rem auto' }}>
    <section>{children}</section>
  </Box>
);

const Root = ({ children }) => (
  <Box sx={{ maxWidth: 1064, margin: '0 auto' }}>
    <section>{children}</section>
  </Box>
);

Intro.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

const Layout = ({ children }) => (
  <Box sx={{ maxWidth: 1280, margin: '0 auto' }}>
    <Toolbar />
    <Header />
    <main>{children}</main>
  </Box>
);

Layout.Intro = Intro;
Layout.Root = Root;

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
