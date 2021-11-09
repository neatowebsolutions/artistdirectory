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
      <div className="root">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <h1 className="pageTitle">My Profile</h1>
          {/* <h1 className="pageTitle">Artist Profile</h1> */}
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
      </div>
    </Layout>
  </>
);

export default AccountPage;
