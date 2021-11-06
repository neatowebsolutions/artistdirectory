import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Toolbar from './Toolbar';

const Layout = ({ children }) => (
  <>
    <Toolbar />
    <Header />
    <main>{children}</main>
    <footer>Footer</footer>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
