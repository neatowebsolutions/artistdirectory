// NB! - this page will be removed after merging with master in oksana branch. I will be using LogIn component in the header to handle login functionality (there will be no separate page)

import Head from 'next/head';
import LogIn from '../../components/LogIn';

import { Layout } from '../../components';

const LogInPage = () => {
  return (
    <>
      <Head>
        <title>Log In</title>
      </Head>
      <Layout>
        <Layout.Intro>
          <LogIn />
        </Layout.Intro>
      </Layout>
    </>
  );
};

export default LogInPage;
