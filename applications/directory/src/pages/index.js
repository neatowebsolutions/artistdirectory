import { Loader } from '@artistdirectory/react-components';
import Head from 'next/head';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import { Layout, Search } from '../components';
import { useCategories, useTags, useSkills } from '../hooks';

const HomePage = () => {
  const { categories, categoriesLoading, categoriesError } = useCategories();
  const { tags, tagsLoading, tagsError } = useTags();
  const { skills, skillsLoading, skillsError } = useSkills();

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Layout>
        <Layout.Intro>
          <Typography variant="h1" component="h1">
            Discover artists and their work, all in one place.
          </Typography>
          <Box
            sx={{
              '& p': {
                fontSize: '1.5rem',
                margin: '0 auto'
              }
            }}
          >
            <p>
              Whether you’re looking to purchase artwork, hire an artist, or
              collaborate, this is the place to start.
            </p>
          </Box>
        </Layout.Intro>
        <Card elevation={6}>
          <Loader
            isLoading={categoriesLoading || tagsLoading || skillsLoading}
            isError={categoriesError || tagsError || skillsError}
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
            <Search categories={categories} tags={tags} skills={skills} />
          </Loader>
        </Card>
      </Layout>
    </>
  );
};

export default HomePage;
