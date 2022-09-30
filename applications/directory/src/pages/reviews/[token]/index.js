// TODO handle the scenario when an artist is not found byt the token (show not found page)
import Box from '@mui/material/Box';
import Head from 'next/head';
import Typography from '@mui/material/Typography';
import { Loader } from '@artistdirectory/react-components';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import { useReview } from '../../../hooks';
import ProfileDetails from '../../../components/ProfileDetails';
import PersonalDetails from '../../../components/PersonalDetails';
import ProfileReview from '../../../components/ProfileReview';
import WorkExamples from '../../../components/WorkExamples';
import { Layout } from '../../../components';

const ProfileReviewPage = ({ token }) => {
  const { artist, error, artistLoading, updateReview } = useReview(token);
  const {
    firstName,
    lastName,
    email,
    social,
    profileImageUrl,
    description,
    skills,
    tags,
    categories,
    images,
    createdAt
  } = artist || {};

  const date = new Date(createdAt);
  const memberSince = date.getFullYear();

  return (
    <>
      <Head>
        <title>New Artist Profile</title>
      </Head>
      <Layout >
        <Layout.Root>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: ['90%'],
              margin: ['1.5rem auto', '2.563rem auto', '2.688rem auto']
            }}
          >
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: ['1.5rem', '2rem', '2rem', '2.5rem'],
                fontFamily: 'gira-sans, sans-serif',
                textAlign: 'center',
                letterSpacing: 2
              }}
            >
              {artistLoading || error
                ? 'Artist Profile'
                : `${firstName} ${lastName}'s Profile`}
            </Typography>
          </Box>
          <Loader
            isLoading={artistLoading}
            isError={error}
            loadingComponent={() => (
              <LinearProgress color="primary"></LinearProgress>
            )}
            errorComponent={() => (
              <Alert
                severity="error"
                sx={{
                  fontSize: '1.2rem'
                }}
              >
                An unexpected error occurred. Please try again shortly.
              </Alert>
            )}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: ['column', 'row'],
                justifyContent: 'space-between'
              }}
            >
              <Box
                sx={{ flex: 1, marginRight: ['0', '5%'], marginBottom: '5%' }}
              >
                <ProfileDetails
                  artist={{
                    firstName,
                    lastName,
                    email,
                    social,
                    profileImageUrl,
                    memberSince
                  }}
                />
              </Box>

              <Box sx={{ flex: 3 }}>
                <PersonalDetails
                  artist={{ firstName, description, skills, tags, categories }}
                />
                <WorkExamples images={images} />
              </Box>
            </Box>
            <Box>
              <ProfileReview onSubmit={updateReview} />
            </Box>
          </Loader>
        </Layout.Root>
      </Layout>
    </>
  );
};

export async function getServerSideProps(context) {
  const { token } = context.params;
  return {
    props: { token }
  };
}

export default ProfileReviewPage;
