import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Toolbar from './Toolbar';
import classes from './Layout.module.scss';

const Intro = ({ children }) => (
  <section className={classes.intro}>{children}</section>
);

Intro.propTypes = {
  children: PropTypes.node.isRequired
};

const Layout = ({ children }) => (
  <div className={classes.root}>
    <Toolbar />
    <Header />
    <main className={classes.main}>{children}</main>
  </div>
);

Layout.Intro = Intro;

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
