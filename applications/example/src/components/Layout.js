import React from 'react';
import PropTypes from 'prop-types';

const Layout = ({ children }) => (
  <>
    <header>Header</header>
    <main>{children}</main>
    <footer>Footer</footer>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
