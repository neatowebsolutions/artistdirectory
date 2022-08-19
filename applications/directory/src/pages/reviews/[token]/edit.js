import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Head from 'next/head';
//import { Loader } from '@artistdirectory/react-components';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import { useRouter } from 'next/router';
//import { useArtistByToken } from '../../hooks';
//import ProfileDetails from '../../components/ProfileDetails';
//import PersonalDetails from '../../components/PersonalDetails';
//import ProfileReview from '../../components/ProfileReview';
//import WorkExamples from '../../components/WorkExamples';
import { Layout } from '../../../components';

const ProfileReviewEditPage = () => {
  const router = useRouter();
 // const { artist, error, artistLoading } = useArtistByToken(router.query.token);
  //console.log(artist);
 // console.log(error); // TODO handle the scenario when an artist is not found byt the token
console.log(router.query)
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
                fontSize: '2.2rem',
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
                      mr: '0',
                    },
                  },
                },
              },
            }}
          >
            <h1>Edit artist profile</h1>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >some form</Box>
        </Layout.Root>
      </Layout>
    </>
  );
};

// export async function getServerSideProps(context) {
//   const { token } = context.params;

//   return {
//     props: { token }
//   };
// }

export default ProfileReviewEditPage;
