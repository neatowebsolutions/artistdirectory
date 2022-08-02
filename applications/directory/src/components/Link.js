import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import { Link as MuiLink } from '@mui/material';

const Link = forwardRef(({ href, children, ...props }, ref) => {
  const isExternal = href.match(/^https?:/);

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }

  return (
    <NextLink href={href} passHref>
      <MuiLink ref={ref} {...props}>
        {children}
      </MuiLink>
    </NextLink>
  );
});

Link.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node
};

export default Link;
