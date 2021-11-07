import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Head from 'next/head';
import ProfileDetails from '../../components/ProfileDetails';
import { Layout } from '../../components';
import classes from './edit.module.scss';
import EditProfileTabs from '../../components/EditProfileTabs';

const AccountEditPage = () => (
  <>
    <Head>
      <title>My Profile</title>
    </Head>
    <Layout>
      <div className={classes.root}>
        <div className={classes.profileTitle}>
          <h1>My Profile</h1>
          <nav>
            <ul>
              <li>
                <Button variant="text">Cancel Changes</Button>
              </li>
              <li>
                <Button variant="contained" disableElevation>
                  Save Changes
                </Button>
              </li>
            </ul>
          </nav>
        </div>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
          }}
        >
          <Box sx={{ flex: 1, marginRight: '5%' }}>
            <ProfileDetails />
          </Box>
          <Box sx={{ flex: 3 }}>
            <EditProfileTabs />
          </Box>
        </Box>
      </div>
    </Layout>
  </>
);

export default AccountEditPage;
