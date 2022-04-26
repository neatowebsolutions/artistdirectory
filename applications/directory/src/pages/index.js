import { Loader } from '@artistdirectory/react-components';
import Head from 'next/head';
import Card from '@mui/material/Card';
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
          <Box
            sx={{
              typography: 'body2',
              lineHeight: ['normal', 1.17, 1.2],
              fontSize: [24, 48, 60], //'3.75rem',
              fontWeight: 'bold',
              letterSpacing: [0.18, 'normal', -0.5],
              margin: '3rem auto 1.5rem auto',
            }}
          >
            Discover artists and their work,
            <br /> all in one place.
          </Box>
          <Box
            sx={{
              '& p': {
                fontSize: '1.5rem',
                margin: '0 auto',
              },
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
                  fontSize: '1.2rem',
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
