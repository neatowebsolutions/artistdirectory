import { useRouter } from 'next/router';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Layout } from '../../components';

const ThankYouPage = () => {
  const { query } = useRouter();

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
            <Card
              sx={{
                mr: ['0', '5%'],
                mb: ['5%', '0'],
                flex: 1,
                textAlign: 'center',
                width: '100%',
                '& p': {
                  margin: '1rem 0'
                },
                '& .grad': {
                  textTransform: 'uppercase',
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  letterSpacing: '3px'
                },
                '& .get-found': {
                  textTransform: 'uppercase',
                  color: 'secondary.main',
                  fontWeight: 'bold',
                  letterSpacing: '3px'
                },
                '& .thanks': {
                  typography: 'body2',
                  fontSize: '2.12rem',
                  color: 'secondary.secondary',
                  fontWeight: 'bold'
                },
                '& .profile': {
                  color: 'secondary.secondary',
                  fontSize: '1.5rem',
                  fontWeight: '500'
                }
              }}
              elevation={6}
            >
              <p className="grad">Grand Rapids Artist Directory</p>
              <p className="get-found">Get Found.</p>
              <img src="" alt="" />
              <p className="thanks">Thanks, {query.name}!</p>
              <p className="profile">
                Your profile has been submitted for review!
              </p>
            </Card>
          </Box>
        </Layout.Root>
      </Layout>
    </>
  );
};

export default ThankYouPage;
