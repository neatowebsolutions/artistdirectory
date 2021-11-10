import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Head from 'next/head';
import ProfileDetails from '../../components/ProfileDetails';
import { Layout } from '../../components';
import EditProfileTabs from '../../components/EditProfileTabs';

const AccountEditPage = () => (
  <>
    <Head>
      <title>My Profile</title>
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
            },
            '& nav': {
              '& ul': {
                margin: 0,
                padding: 0,
                listStyle: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                '& li': {
                  mr: '20px',
                  '&:last-child': {
                    mr: '0'
                  }
                }
              }
            }
          }}
        >
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
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
          }}
        >
          <Box sx={{ flex: 1, mr: '5%' }}>
            <ProfileDetails />
          </Box>
          <Box sx={{ flex: 3 }}>
            <EditProfileTabs />
          </Box>
        </Box>
      </Layout.Root>
    </Layout>
  </>
);

export default AccountEditPage;
