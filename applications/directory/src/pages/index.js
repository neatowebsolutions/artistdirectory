import Head from 'next/head';
import { Layout, Search } from '../components';
import styles from './index.module.scss';

const HomePage = () => (
  <>
    <Head>
      <title>Home</title>
    </Head>
    <Layout>
      <Layout.Intro>
        <div className={styles.heading}>
          Discover artists and their work all in one place.{' '}
        </div>
        <p className={styles.description}>
          Whether you’re looking to purchase artwork, hire an artist, or
          collaborate, this is the place to start.
        </p>
      </Layout.Intro>
      <Search className={styles.search} />
    </Layout>
  </>
);

export default HomePage;
