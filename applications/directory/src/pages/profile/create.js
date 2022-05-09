import Head from 'next/head';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
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
          <Box>
            <Box
              sx={{
                width: "100%",
                '& h2': {
                  fontWeight: '900',
                  fontSize: ['0.875rem', '1.25rem', '1.5rem'],
                  textTransform: 'uppercase',
                  letterSpacing: 3.53,
                  mb: '1.5rem',
                },
              }}
            >
              <Typography variant="h2" component="h2">
                Grand Rapids Artist Directory
              </Typography>
            </Box>

            <Box
              sx={{
                '& h1': {
                  //  fontSize: ['1.5rem', '3rem', '3.75rem'],
                  fontFamily: 'gira-sans, sans-serif',
                  lineHeight: ['normal', '1.17', '1.2'],
                  textTransform: 'uppercase',
                  color: 'primary.main',
                  letterSpacing: [2, 3],
                },
              }}
            >
              <Typography variant="h1" component="h1">
                Get found.
              </Typography>
            </Box>
            <Box
              sx={{
                maxWidth: ['90%', '45rem', '52.5rem'], // TODO - width is to narrow on screens less than tablet
                margin: '0 auto',
                '& p': {
                  margin: [
                    '1.563rem 1rem 1rem',
                    '3.688rem 1.5rem 3rem',
                    '2.688rem 5.75rem 1.5rem',
                  ],
                },
              }}
            >
              <Typography variant="body1">
                By submitting this form you agree to have the following listed
                in the LAN: name, profession, website, Instagram, a thumbnail
                image of work, and a short description of your talents and
                services.
              </Typography>
            </Box>
            <Box
              sx={{
                maxWidth: ['90%', '45rem', '52.5rem'],
                margin: '0 auto',
                '& p': {
                  margin: ['1rem', '3rem 1.5rem 3.5rem', '1.5rem 5.75rem'],
                },
              }}
            >
              <Typography variant="body1">
                We’re building a directory of the artists (art, design, music,
                performance) in the greater Grand Rapids area, so that people
                can discover their work all in once place. Whether you’re
                looking to sell work, get hired for a project, or collaborate
                with another artist, the Local Artist Network can help you reach
                your goal.
              </Typography>
            </Box>
            <Box
              sx={{
                maxWidth: ['18.25rem', '38.813rem', '50.875rem'],
                margin: '0 auto',
                '& p': {
                  fontStyle: 'italic',
                  // display: 'inline-block',
                },
                '& p a': {
                  fontStyle: 'normal',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  letterSpacing: 1.25,
                  color: 'primary.main',
                  //  margin: ['0 0 0 8px', '0 0 0 1rem'],
                },
              }}
            >
              <Typography variant="body1">
                You may remove yourself from this listing at any time by
                emailing
                <br />
                <a href="mailto:avenueforthearts@gmail.com">
                  avenueforthearts@gmail.com
                </a>
              </Typography>
            </Box>
          </Box>
        </Layout.Intro>
        <Box sx={{ maxWidth: '782px', margin: '0 auto' }}>
          <CreateProfileForm
            skills={skills}
            tags={tags}
            categories={categories}
          />
        </Box>
      </Layout>
    </>
  );
};

export default CreatePage;
