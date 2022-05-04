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
                  fontSize: ['0.875rem', '1.25rem', '1.5rem'],
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
                //  letterSpacing: 10,
                '& span': {
                  fontSize: ['1.5rem', '3rem', '3.75rem'],
                  fontWeight: 'bold',
                  lineHeight: ['normal', '1.17', '1.2'],
                  letterSpacing: ['2px', '3px'],
                  textTransform: 'uppercase',
                  color: 'primary.main',
                },
              }}
            >
              <span>Get found.</span>
            </Box>
            <Box
              sx={{
                //  letterSpacing: ['0.25', '0.5', '0.15'],
                //  lineHeight: ['1.43', '1.5', '1.6'],
                maxWidth: 840, //1080, //???
                margin: '0 auto',
                '& p': {
                  margin: [
                    '1.6rem 1rem  1rem',
                    '3.7rem 1.5rem 3rem',
                    '2.7rem 4.8rem 1.5rem',
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
                //  fontSize: ['0.9rem', '1rem', '1.25rem'],
                //   letterSpacing: ['0.25', '0.5', '0.15'],
                //  lineHeight: ['1.43', '1.5', '1.6'],
                maxWidth: 840,
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
                margin: [
                  '1rem 4.37rem',
                  '1rem 4.6rem 1rem 4.6rem',
                  '1.5rem 6.5rem 1rem',
                ],
                '& p': {
                  fontStyle: 'italic',
                  display: 'inline-block',
                },
                '& p a': {
                  fontStyle: 'normal',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  letterSpacing: '1.25px',
                  color: 'primary.main',
                  margin: ['0 0 0 8px', '0 0 0 1rem'],
                },
              }}
            >
              <Typography variant="body1">
                You may remove yourself from this listing at any time by
                emailing
              </Typography>
              <br />
              <Typography variant="body1">
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
