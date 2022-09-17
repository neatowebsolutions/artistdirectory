import Box from '@mui/material/Box';
import Head from 'next/head';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Card from '@mui/material/Card';
import { Loader } from '@artistdirectory/react-components';
import LinearProgress from '@mui/material/LinearProgress';
import CreateProfileForm from '../../../components/CreateProfileForm';
import { Layout } from '../../../components';
import {
  useCategories,
  useTags,
  useSkills,
  useEditProfile
} from '../../../hooks';

const ProfileReviewEditPage = ({ token }) => {
  // TODO handle the scenario when an artist is not found byt the token (not found page)
  const { artist, artistError, artistLoading } = useEditProfile(token);
  const { categories, categoriesLoading, categoriesError } = useCategories();
  const { skills, skillsLoading, skillsError } = useSkills();
  const { tags, tagsLoading, tagsError } = useTags();
  const loading =
    categoriesLoading || tagsLoading || skillsLoading || artistLoading;
  const error = categoriesError || tagsError || skillsError || artistError;
  return (
    <>
      <Head>
        <title>New Artist Profile Edit</title>
      </Head>
      <Layout>
        <Layout.Root>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Typography
              variant="h1"
              component="h1"
              sx={{ textAlign: 'center' }}
            >
              Edit artist profile
            </Typography>
          </Box>

          <Card elevation={6}>
            <Loader
              isLoading={loading}
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
                  elevation={4}
                >
                  An unexpected error occurred. Please try again shortly.
                </Alert>
              )}
            >
              <CreateProfileForm
                skills={skills}
                tags={tags}
                categories={categories}
                artist={artist}
              />
            </Loader>
          </Card>
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

export default ProfileReviewEditPage;
