import Head from 'next/head';
import Box from '@mui/material/Box';
import PersonalDetails from '../../components/PersonalDetails';
import ProfileDetails from '../../components/ProfileDetails';
import WorkExamples from '../../components/WorkExamples';
import { Layout } from '../../components';

const AccountPage = () => (
  <>
    <Head>
      <title>Artist Account</title>
    </Head>
    <Layout>
      <Layout.Root>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            '& h1': {
              fontSize: '2.2rem'
            }
          }}
        >
          <h1>My Profile</h1>
          {/* <h1>Artist Profile</h1> */}
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: ['center', 'start', 'start', 'start', 'start'],
            flexDirection: ['column', 'column', 'row', 'row', 'row']
          }}
        >
          <Box
            sx={{
              flex: 1,
              mr: ['0', '0', '5%', '5%', '5%'],
              mb: '50px',
              width: '100%'
            }}
          >
            <ProfileDetails />
          </Box>
          <Box sx={{ flex: 3 }}>
            <PersonalDetails />
            <WorkExamples />
          </Box>
        </Box>
      </Layout.Root>
    </Layout>
  </>
);

export default AccountPage;
