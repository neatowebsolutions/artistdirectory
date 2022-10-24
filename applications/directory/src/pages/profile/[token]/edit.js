import Box from '@mui/material/Box';
import Head from 'next/head';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { Loader } from '@artistdirectory/react-components';
import LinearProgress from '@mui/material/LinearProgress';
import CreateProfileForm from '../../../components/CreateProfileForm';
import { Layout } from '../../../components';
import {
  useCategories,
  useTags,
  useSkills,
  useRejectedArtist,
  use404
} from '../../../hooks';

const ProfileReviewEditPage = ({ token }) => {
  const { artist, artistError, artistLoading } = useRejectedArtist(token);
  const { categories, categoriesLoading, categoriesError } = useCategories();
  const { skills, skillsLoading, skillsError } = useSkills();
  const { tags, tagsLoading, tagsError } = useTags();
  const loading =
    categoriesLoading || tagsLoading || skillsLoading || artistLoading;
  const error = categoriesError || tagsError || skillsError || artistError;

  use404(error);

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
              justifyContent: 'center',
              marginBottom: ['2rem', '3.5rem'],
              marginTop: ['1rem', '2.5rem']
            }}
          >
            <Typography variant="h1">Edit artist profile</Typography>
          </Box>

          <Box
            sx={{
              maxWidth: '48.875rem',
              margin: ['2rem auto 0', '4.125rem auto 0', '3.5rem auto 0']
            }}
          >
            <Loader
              isLoading={loading}
              isError={Boolean(error)}
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
          </Box>
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
