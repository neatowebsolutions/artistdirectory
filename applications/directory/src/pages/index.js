import Head from 'next/head';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import { Layout, Search } from '../components';
import classes from './index.module.scss';

const HomePage = () => (
  <>
    <Head>
      <title>Home</title>
    </Head>
    <Layout>
      <Layout.Intro>
        <Box className={classes.heading} sx={{ lineHeight: [1, 1.5] }}>
          Discover artists and their work all in one place.
        </Box>
        <p className={classes.description}>
          Whether you’re looking to purchase artwork, hire an artist, or
          collaborate, this is the place to start.
        </p>
      </Layout.Intro>
      <Card className={classes.searchCard} elevation={6}>
        <Search />
      </Card>
    </Layout>
  </>
);

export default HomePage;
