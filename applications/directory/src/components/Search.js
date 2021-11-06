import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Search.module.scss';

const Search = ({ className }) => {
  return <div className={clsx(styles.root, className)}>TODO</div>;
};

Search.propTypes = {
  className: PropTypes.string
};

export default Search;
