import { Loader } from '@artistdirectory/react-components';
import LinearProgress from '@mui/material/LinearProgress';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Alert from '@mui/material/Alert';
import PersonalDetails from '../../components/PersonalDetails';
import ProfileDetails from '../../components/ProfileDetails';
import WorkExamples from '../../components/WorkExamples';
import { Layout } from '../../components';
import useProfile from '../../hooks/profile';
import useAuthorization from '../../hooks/authorization';
import RouteGuard from '../../components/RouteGuard';
import withAuth from '../../components/withAuth';

// TODO - it does not log user out if access token because undefined?? or it just creates arror because the call to get /profile was unsuccessfull

const ProfilePage = () => {
  // console.log(props);

  const { profile, profileLoading, profileError } = useProfile();
  console.log(profile);
  console.log(profileError);
  console.log(profileLoading);

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

              justifyContent: 'space-between',
              alignItems: ['center', 'start', 'start', 'start', 'start'],
              flexDirection: ['column', 'column', 'row', 'row', 'row']
            }}
          >
            <Loader
              isLoading={profileLoading}
              isError={profileError}
              loadingComponent={() => (
                <Card
                  elevation={6}
                  sx={{ width: '100%', marginTop: '1.375rem' }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '1.375rem',
                      '& h1': {
                        fontSize: '2.2rem'
                      }
                    }}
                  >
                    <h1>My Profile</h1>
                  </Box>
                  <LinearProgress color="primary"></LinearProgress>{' '}
                </Card>
              )}
              errorComponent={() => (
                <Alert
                  severity="error"
                  sx={{
                    fontSize: '1.2rem'
                  }}
                  elevation={4}
                >
                  An unexpected error occurred. Please try again shortly.
                </Alert>
              )}
            >
              <Box
                sx={{
                  flex: 1,
                  mr: ['0', '0', '5%', '5%', '5%'],
                  mb: '50px',
                  width: '100%'
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.375rem',
                    '& h1': {
                      fontSize: '2.2rem'
                    }
                  }}
                >
                  <h1>My Profile</h1>
                </Box>
                <ProfileDetails artist={profile} />
              </Box>
              <Box sx={{ flex: 3 }}>
                <PersonalDetails artist={profile} />
                {/* TODO  - why profile.images gives an error */}
                <WorkExamples images={profile?.images} />
              </Box>
            </Loader>
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

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/auth/login', // TODO - where to send
//         permanent: false
//       }
//     };
//   }

//   return {
//     props: { session }
//   };
// }
