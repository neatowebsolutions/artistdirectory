import Head from 'next/head';
import Box from '@mui/material/Box';
import PersonalDetails from '../../components/PersonalDetails';
import ProfileDetails from '../../components/ProfileDetails';
import WorkExamples from '../../components/WorkExamples';
import { Layout } from '../../components';

// Done restyling
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
            alignItems: 'start'
          }}
        >
          <Box sx={{ flex: 1, marginRight: '5%' }}>
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
