import Head from 'next/head';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { Layout } from '../components';

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>404</title>
      </Head>
      <Layout>
        <Layout.Intro>
          <Box
            sx={{
              marginTop: ['1.5rem', '2.5rem', '2.6rem', '4.188rem'],
              marginBottom: ['1.5rem', '2.5rem', '2.6rem', '4.188rem']
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
              <Box>
                <Typography
                  variant="h1"
                  component="h1"
                  sx={{
                    fontWeight: '900',
                    fontSize: ['3rem', '3.5rem', '4rem'],
                    color: 'secondary.secondary',
                    textTransform: 'uppercase',
                    letterSpacing: [2, 3],
                    marginBottom: ['1.063rem', '1.625rem', '1.5rem']
                  }}
                >
                  404
                </Typography>
                <Typography
                  variant="h2"
                  component="h2"
                  sx={{
                    fontWeight: '900',
                    fontSize: ['1.25rem', '1.5rem', '2rem'],
                    color: 'secondary.secondary',
                    textTransform: 'uppercase',
                    letterSpacing: [2, 3],
                    marginBottom: ['1.063rem', '1.625rem', '1.5rem']
                  }}
                >
                  Page Not found
                </Typography>
              </Box>
              <Box>
                <Box
                  component="img"
                  src="/images/img-sadface.svg"
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
                  Oh No! That page has gone missing...
                </Typography>
              </Box>
            </Card>
          </Box>
        </Layout.Intro>
      </Layout>
    </>
  );
};

export default Custom404;
