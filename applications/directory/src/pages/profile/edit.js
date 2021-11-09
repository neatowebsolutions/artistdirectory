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
      <div className="root">
        <Box
          className={classes.profileTitle}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <h1 className="pageTitle">My Profile</h1>
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
        </Box>

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
