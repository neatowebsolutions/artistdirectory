import Head from 'next/head';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link as MuiLink } from '@mui/material';
import Alert from '@mui/material/Alert';
import { Loader } from '@artistdirectory/react-components';
import LinearProgress from '@mui/material/LinearProgress';
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
              marginTop: ['1.5rem', '2.563rem', '2.688rem'],
              '& div': {
                margin: '0 auto'
              }
            }}
          >
            <Box
              sx={{
                width: '100%',
                '& h2': {
                  fontWeight: '900',
                  fontSize: ['0.875rem', '1.25rem', '1.5rem'],
                  textTransform: 'uppercase',
                  letterSpacing: 3.53,
                  marginBottom: ['1.063rem', '1.625rem', '1.5rem'],
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
                  fontFamily: 'gira-sans, sans-serif',
                  lineHeight: ['normal', '1.17', '1.2'],
                  textTransform: 'uppercase',
                  color: 'primary.main',
                  letterSpacing: [2, 3]
                }
              }}
            >
              <Typography variant="h1" component="h1">
                Get found.
              </Typography>
            </Box>
            <Box
              sx={{
                maxWidth: ['96%', '45rem', '52.5rem'],
                '& p': {
                  margin: [
                    '1.563rem 0rem 1rem 0rem',
                    '3.688rem 1.5rem 3rem',
                    '2.688rem 5.75rem 1.5rem'
                  ]
                }
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
                '& p': {
                  margin: ['1rem 0rem', '3rem 1.5rem 3.5rem', '1.5rem 5.75rem'],
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
                '& p': {
                  fontStyle: 'italic',
                  marginBottom: '1rem',
                },
              }}
            >
              <Typography variant="body1">
                You may remove yourself from this listing at any time by
                emailing
              </Typography>
              <MuiLink
                sx={{
                  fontStyle: 'normal',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  letterSpacing: 1.25,
                  color: 'primary.main',
                }}
                href="mailto:avenueforthearts@gmail.com"
              >
                avenueforthearts@gmail.com
              </MuiLink>
            </Box>
          </Box>
        </Layout.Intro>
        <Box
          sx={{
            maxWidth: '48.875rem',
            margin: ['2rem auto 0', '4.125rem auto 0', '3.5rem auto 0'],
          }}
        >
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
