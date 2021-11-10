import Head from 'next/head';
import Box from '@mui/material/Box';
import { Layout } from '../../components';
import CreateProfileForm from '../../components/CreateProfileForm';

// Done restyling
const CreatePage = () => (
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
              mt: '1.5rem'
            }
          }}
        >
          <Box
            sx={{
              '& p': {
                typography: 'body1',
                fontWeight: 'bold',
                fontSize: '1.5rem',
                textTransform: 'uppercase',
                letterSpacing: '3.53px',
                mb: '1.5rem'
              }
            }}
          >
            <p>Create your artist profile</p>
          </Box>

          <h1>Local Artist Network</h1>
          <Box sx={{ maxWidth: 1080, margin: '0 auto' }}>
            <p>
              By submitting this form, you agree to have the following listed in
              the LAN: name, profession, website, Instagram, a thumbnail image
              of work, and a short description of your talents and services.
            </p>
          </Box>
          <Box sx={{ maxWidth: 814, margin: '0 auto' }}>
            <p>
              We&apos;re building a directory of the artists (art, design,
              music, performance) in the greater Grand Rapids area, so that
              people can discover their work all in once place. Whether
              you&apos;re looking to sell work, get hired for a project, or
              collaborate with another artist, the Local Artist Network can help
              you reach your goal.
            </p>
          </Box>
          <Box
            sx={{
              '& p span': {
                fontStyle: 'italic'
              },
              '& p a': {
                textTransform: 'uppercase',
                fontWeight: 'bold',
                letterSpacing: '1.25px',
                color: 'primary.main'
              }
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
        <CreateProfileForm />
      </Box>
    </Layout>
  </>
);

export default CreatePage;
