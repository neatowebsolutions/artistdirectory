import Head from 'next/head';
import { Layout } from '../components';

const HomePage = () => (
  <>
    <Head>
      <title>Home</title>
    </Head>
    <Layout>
      <h1>Homepage</h1>
    </Layout>
  </>
);

export default HomePage;
