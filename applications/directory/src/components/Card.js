import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Card.module.scss';

const Card = ({ className, children }) => (
  <div className={clsx(styles.root, className)}>{children}</div>
);

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

export default Card;
