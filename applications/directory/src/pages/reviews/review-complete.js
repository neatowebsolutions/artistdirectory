import Head from 'next/head';
import Box from '@mui/material/Box';
import ProfileReviewComplete from '../../components/ProfileReviewComplete';
import { Layout } from '../../components';

const ProfileReviewCompletePage = () => {
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
            <ProfileReviewComplete />
          </Box>
        </Layout.Root>
      </Layout>
    </>
  );
};

export default ProfileReviewCompletePage;
