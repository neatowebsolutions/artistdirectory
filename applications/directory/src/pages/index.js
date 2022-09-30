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

  const isLoading = !!(categoriesLoading || tagsLoading || skillsLoading);
  const isError = !!(categoriesError || tagsError || skillsError);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Layout>
        <Layout.Intro>
          <Box sx={{ marginTop: ['1rem', '3.5rem'] }}>
            <Typography variant="h1" component="h1">
              Discover artists and their work,
              <br />
              all in one place.
            </Typography>
            <Box
              sx={{
                '& p': {
                  margin: '1rem 0'
                },
                '& p:nth-of-type(2n)': {
                  fontStyle: 'italic'
                }
              }}
            >
              <Typography variant="body1">
                Whether you’re looking to purchase artwork, hire an artist, or
                collaborate, this is the place to start.
              </Typography>
              <Typography variant="body1">
                Search by Type of Artist, Tags, Hireable Skills, or whatever you
                need.
              </Typography>
            </Box>
          </Box>
        </Layout.Intro>
        <Card elevation={6}>
          <Loader
            isLoading={isLoading}
            isError={isError}
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
            <Search categories={categories} tags={tags} skills={skills} />
          </Loader>
        </Card>
      </Layout>
    </>
  );
};

export default HomePage;
