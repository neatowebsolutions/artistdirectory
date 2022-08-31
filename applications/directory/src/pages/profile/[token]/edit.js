import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Head from 'next/head';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import CreateProfileForm from '../../../components/CreateProfileForm';
import { Layout } from '../../../components';
import { useEditProfile } from '../../../hooks';
const ProfileReviewEditPage = () => {
  const router = useRouter();
  // TODO handle the scenario when an artist is not found byt the token (not found page)
  console.log(router.query);
  const { artist, error, artistLoading } = useEditProfile(router.query.token);
  console.log(artist);
  console.log(error);
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
              justifyContent: 'space-between',
              '& h1': {
                fontSize: '2.2rem'
              },
              '& nav': {
                '& ul': {
                  margin: 0,
                  padding: 0,
                  listStyle: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  '& li': {
                    mr: '20px',
                    '&:last-child': {
                      mr: '0'
                    }
                  }
                }
              }
            }}
          >
            <h1>Edit artist profile</h1>
          </Box>

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

export default ProfileReviewEditPage;
