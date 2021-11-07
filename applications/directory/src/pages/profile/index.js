import Head from 'next/head';
import Box from '@mui/material/Box';
import PersonalDetails from '../../components/PersonalDetails';
import ProfileDetails from '../../components/ProfileDetails';
import WorkExamples from '../../components/WorkExamples';
import classes from './index.module.scss';
import { Layout } from '../../components';

const AccountPage = () => (
  <>
    <Head>
      <title>Artist Account</title>
    </Head>
    <Layout>
      <div className={classes.root}>
        <div className={classes.profileTitle}>
          <h1>My Profile</h1>
          {/* <h1>Artist Profile</h1> */}
        </div>
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
