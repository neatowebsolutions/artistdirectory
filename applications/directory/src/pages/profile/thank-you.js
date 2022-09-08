import { useRouter } from 'next/router';
import Head from 'next/head';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { Layout } from '../../components';

const ThankYouPage = () => {
  const { query } = useRouter();

  return (
    <>
      <Head>
        <title>Thank you</title>
      </Head>
      <Layout>
        <Layout.Root>
          <Box
            sx={{
              marginTop: ['1.5rem', '2.5rem', '2.6rem', '4.188rem']
            }}
          >
            <Card
              sx={{
                textAlign: 'center',
                width: ['100%', '80%', '70%'],
                margin: '0 auto'
              }}
              elevation={6}
            >
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  fontWeight: '900',
                  fontSize: ['0.875rem', '1.25rem', '1.5rem'],
                  textTransform: 'uppercase',
                  letterSpacing: 3.53,
                  marginBottom: ['1.063rem', '1.625rem', '1.5rem']
                }}
              >
                Grand Rapids Artist Directory
              </Typography>
              <Box>
                <Typography
                  variant="h2"
                  component="h2"
                  sx={{
                    fontFamily: 'gira-sans, sans-serif',
                    lineHeight: ['normal', '1.17', '1.2'],
                    textTransform: 'uppercase',
                    color: 'success.main',
                    letterSpacing: [2, 3]
                  }}
                >
                  Get found.
                </Typography>
              </Box>
              <Box>
                <Box
                  component="img"
                  src="/images/img-success.svg"
                  alt="Success"
                  sx={{
                    width: ['4rem', '5rem', '9rem'],
                    marginTop: ['1rem', '1.5rem', '2.6rem'],
                    marginBottom: ['1rem', '1.3rem']
                  }}
                />
                <Typography
                  variant="h3"
                  component="h3"
                  sx={{
                    color: 'secondary.secondary',
                    fontWeight: 'bold',
                    margin: 'margin: 1.375rem 0 0.813rem'
                  }}
                >
                  Thanks, {query.name}!
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'secondary.secondary',
                    fontWeight: '500',
                    margin: '0.813rem 0 0'
                  }}
                >
                  Your profile has been submitted for review!
                </Typography>
              </Box>
            </Card>
          </Box>
        </Layout.Root>
      </Layout>
    </>
  );
};

export default ThankYouPage;
