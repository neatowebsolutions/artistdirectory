import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Head from 'next/head';
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
            <h1>Edit artist profile</h1>
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
