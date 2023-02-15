import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { Card } from '@mui/material';
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
          {/* TODO - add a box for styling to add margin  
           
           */}
          <Card
            sx={{
              textAlign: 'center',
              width: ['100%', '80%', '70%'],
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: ['1.5rem', '2.5rem', '2.6rem', '4.188rem'],
              marginBottom: ['1.5rem', '2.5rem', '2.6rem', '4.188rem']
            }}
            elevation={6}
          >
            <LogIn />
          </Card>
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
