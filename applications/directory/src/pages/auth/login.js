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
        <Layout.Root>
          <LogIn />
        </Layout.Root>
      </Layout>
    </>
  );
};

export default LogInPage;
