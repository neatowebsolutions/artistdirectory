import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import NextLink from 'next/link';
import Box from '@mui/material/Box';
import { Link as MuiLink } from '@mui/material';

const Link = forwardRef(({ href, children, ...props }, ref) => {
  const isExternal = href.match(/^https?:/); // TODO - make url that starts with www. external as well??

  if (isExternal) {
    return (
      <Box
        component="a"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </Box>
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
