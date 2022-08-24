import { useRouter } from 'next/router';
import Head from 'next/head';
import Box from '@mui/material/Box';
import ThankYou from '../../components/ThankYou';
import { Layout } from '../../components';

const ThankYouPage = () => {
  const router = useRouter();
  console.log(router);
  return (
    <>
      <Head>
        <title>Thank you</title>
      </Head>
      <Layout>
        <Layout.Root>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: ['center', 'start', 'start', 'start', 'start'],
              flexDirection: ['column', 'column', 'row', 'row', 'row']
            }}
          >
            <ThankYou />
          </Box>
        </Layout.Root>
      </Layout>
    </>
  );
};

export default ThankYouPage;
