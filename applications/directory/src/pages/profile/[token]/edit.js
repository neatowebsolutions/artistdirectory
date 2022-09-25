import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
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
              justifyContent: 'center',
              marginBottom: ['2rem', '3.5rem'],
              marginTop: ['1rem', '2.5rem']
            }}
          >
            <Typography variant="h1">Edit artist profile</Typography>
          </Box>

          {/* TODO - checkout styles in create profile page <Box
          sx={{
            maxWidth: '48.875rem',
            margin: ['2rem auto 0', '4.125rem auto 0', '3.5rem auto 0']
          }} */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start'
            }}
          >
            <CreateProfileForm />
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
