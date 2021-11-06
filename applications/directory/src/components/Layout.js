import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Toolbar from './Toolbar';
import styles from './Layout.module.scss';

const Intro = ({ children }) => (
  <section className={styles.description}>{children}</section>
);

Intro.propTypes = {
  children: PropTypes.node.isRequired
};

const Layout = ({ children }) => (
  <div className={styles.root}>
    <Toolbar />
    <Header />
    <main className={styles.main}>{children}</main>
  </div>
);

Layout.Intro = Intro;

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
