import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { Layout } from '../../components';
import CreateAccount from '../../components/CreateAccount';

const CreateAccountPage = () => (
  <>
    <Head>
      <title>Create Your Account</title>
    </Head>
    <Layout>
      <Layout.Intro>
        <CreateAccount />
      </Layout.Intro>
    </Layout>
  </>
);

export default CreateAccountPage;

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
