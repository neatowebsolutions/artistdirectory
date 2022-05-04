import { Loader } from '@artistdirectory/react-components';
import Head from 'next/head';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import { Typography } from '@mui/material';
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
              //  typography: 'h1',
              // fontSize: ['1.5rem', '3rem', '3.75rem'],
              // lineHeight: ['normal', 1.17, 1.2],
              '& h1': {
                fontWeight: 'bold',
                letterSpacing: [0.18, 'normal', -0.5],
              },
              margin: ['1rem', '3rem auto 1.5rem auto'],
            }}
          >
            <Typography variant="h1">
              Discover artists and their work,
              <br /> all in one place.
            </Typography>
          </Box>
          <Box
            sx={{
              margin: '0 auto',
            }}
          >
            <Typography variant="body1">
              Whether you’re looking to purchase artwork, hire an artist, or
              collaborate, this is the place to start.
            </Typography>
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
