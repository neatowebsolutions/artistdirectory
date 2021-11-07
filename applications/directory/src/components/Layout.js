import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Header from './Header';
import Toolbar from './Toolbar';
import classes from './Layout.module.scss';

const Intro = ({ className, children }) => (
  <section className={clsx(classes.intro, className)}>{children}</section>
);

Intro.propTypes = {
  className: PropTypes.string,
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
