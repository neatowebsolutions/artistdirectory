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
