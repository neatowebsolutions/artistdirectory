import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Box from '@mui/material/Box';
import PersonalDetails from '../../components/PersonalDetails';
import ProfileDetails from '../../components/ProfileDetails';
import WorkExamples from '../../components/WorkExamples';

import { Layout } from '../../components';
import useProfile from '../../hooks/profile';
import RouteGuard from '../../components/RouteGuard';

const ProfilePage = (props) => {
  // console.log(props);
  const { profile, profileLoading, profileError } = useProfile();
  // console.log(profile);
  // console.log(profileError);
  // console.log(profileLoading);
  return (
    <RouteGuard>
      <Head>
        <title>Artist Profile</title>
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
              {/* <ProfileDetails /> */}
            </Box>
            <Box sx={{ flex: 3 }}>
              {/* <PersonalDetails artist={user} /> */}
              {/* <WorkExamples /> */}
            </Box>
          </Box>
        </Layout.Root>
      </Layout>
    </RouteGuard>
  );
};

export default ProfilePage;

// export async function getServerSideProps(context) {
//   const session = await getSession({ req: context.req });
//   console.log('========GET SERVER PROPS===========');
//   console.log(context.req);
//   if (!session) {
//     return {
//       redirect: {
//         destination: '/auth/login',
//         permanent: false
//       }
//     };
//   }
//   return {
//     props: { session }
//   };
// }
