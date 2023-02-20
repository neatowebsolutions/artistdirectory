import React from 'react';
import { useSession } from 'next-auth/react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './Footer';
import Toolbar from './Toolbar';

const Intro = ({ children }) => (
  <Box sx={{ textAlign: 'center', margin: '0rem auto' }}>
    <section>{children}</section>
  </Box>
);

const Root = ({ children }) => (
  <Box
    sx={{
      maxWidth: '66.5rem',
      margin: '0 auto'
    }}
  >
    <section>{children}</section>
  </Box>
);

Intro.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

// TODO - use Session here to pass props to header ??
const Layout = ({ children }) => {
  //const { data: session, status } = useSession();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden',
        minHeight: '100vh'
      }}
    >
      <Box>
        <Toolbar />
        {/*   <Header session={session} /> */}
        <Header />
      </Box>

      <Box
        component="main"
        sx={{
          backgroundColor: '#fcfcfc',
          marginTop: '3px',
          flex: 1
        }}
      >
        <Box
          sx={{
            maxWidth: ['95%', '95%', '95%', '73.75rem', '80rem'],
            margin: ' 0 auto'
          }}
        >
          {children}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

Layout.Intro = Intro;
Layout.Root = Root;

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
