import Head from 'next/head';
import Box from '@mui/material/Box';
import { Layout } from '../../components';
import ThankYou from '../../components/ThankYou';
import CreateAccount from '../../components/CreateAccount';

function CreateAccount() {
  return (
    <>
      <Head>
        <title>Create Your Account</title>
      </Head>
      <Layout>
        <Layout.Intro>
          <Box
            sx={{
              display: 'flex',
              flexDirection: ['column', 'row'],
              alignItems: ['start']
            }}
          >
            <ThankYou />
            <CreateAccount />
          </Box>
        </Layout.Intro>
      </Layout>
    </>
  );
}

export default CreateAccount;
