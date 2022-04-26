import Head from 'next/head';
import { Loader } from '@artistdirectory/react-components';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { Layout } from '../../components';
import CreateProfileForm from '../../components/CreateProfileForm';
import { useCategories, useTags, useSkills } from '../../hooks';

const CreatePage = () => {
  const { categories, categoriesLoading, categoriesError } = useCategories();
  const { skills, skillsLoading, skillsError } = useSkills();
  const { tags, tagsLoading, tagsError } = useTags();

  return (
    <>
      <Head>
        <title>Create Profile</title>
      </Head>
      <Layout>
        <Layout.Intro>
          <Box
            sx={{
              '& h1': {
                typography: 'body2',
                fontSize: '3.75rem',
                fontWeight: 'bold',
                letterSpacing: '-0.5px',
                mt: '1.5rem',
              },
            }}
          >
            <Box
              sx={{
                '& p': {
                  typography: 'body1',
                  fontWeight: '900',
                  fontSize: '24px',

                  textTransform: 'uppercase',
                  letterSpacing: '3.53px',
                  mb: '1.5rem',
                  lineHeight: '1.5',
                },
              }}
            >
              <p>Grand Rapids Artist Directory</p>
            </Box>
            <Box
              sx={{
                color: 'primary.main',
                letterSpacing: 10,
                '& span': {
                  fontSize: '60px',
                  //  fontSize: [24, 48, 60],
                  fontWeight: 'bold',
                  lineHeight: '72px',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  color: 'primary.main',
                },
              }}
            >
              <span>Get found.</span>
            </Box>
            {/*  '& p': { fontSize: [14, 16,20] } */}
            <Box sx={{ maxWidth: 1080, margin: '0 auto' }}>
              <p>
                By submitting this form you agree to have the following listed
                in the LAN: name, profession, website, Instagram, a thumbnail
                image of work, and a short description of your talents and
                services.
              </p>
            </Box>
            <Box sx={{ maxWidth: 814, margin: '0 auto' }}>
              <p>
                We’re building a directory of the artists (art, design, music,
                performance) in the greater Grand Rapids area, so that people
                can discover their work all in once place. Whether you’re
                looking to sell work, get hired for a project, or collaborate
                with another artist, the Local Artist Network can help you reach
                your goal.
              </p>
            </Box>
            <Box
              sx={{
                '& p span': {
                  fontStyle: 'italic',
                },
                '& p a': {
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  letterSpacing: '1.25px',
                  color: 'primary.main',
                },
              }}
            >
              <p>
                <span>
                  You may remove yourself from this listing at any time by
                  emailing
                </span>
                <br />
                <a href="mailto:avenueforthearts@gmail.com">
                  avenueforthearts@gmail.com
                </a>
              </p>
            </Box>
          </Box>
        </Layout.Intro>
        <Box sx={{ maxWidth: '782px', margin: '0 auto' }}>
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
            <CreateProfileForm
              skills={skills}
              tags={tags}
              categories={categories}
            />
          </Loader>
        </Box>
      </Layout>
    </>
  );
};

export default CreatePage;
/*


 skills={{ skills, skillsLoading, skillsError }}
            tags={{ tags, tagsLoading, tagsError }}
            categories={{ categories, categoriesLoading, categoriesError }}

*/
