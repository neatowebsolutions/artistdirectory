import { getSession } from 'next-auth/react';
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

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }
  return {
    props: { session }
  };
}
