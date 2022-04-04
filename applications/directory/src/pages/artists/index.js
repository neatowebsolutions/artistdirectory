import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import Head from 'next/head';
import Link from 'next/link';
import HttpClient from '@artistdirectory/http-client';
import { sortBy } from 'lodash';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import EastIcon from '@mui/icons-material/East';
import Grid from '@mui/material/Grid';
import { Layout, Search, ArtistSearchResult } from '../../components';

const Category = ({ category, artists }) => {
  if (!artists?.length) {
    return null;
  }

  return (
    <Box
      sx={{
        '& h2': {
          display: 'flex',
          justifyContent: 'space-between'
        }
      }}
    >
      <h2>
        <span>{category.name}</span>
        <Link
          href={`/artists?category=${encodeURIComponent(category.slug)}`}
          passHref
        >
          <Button component="a" color="primary" endIcon={<EastIcon />}>
            See more
          </Button>
        </Link>
      </h2>
      <Grid container spacing={2}>
        {artists.map((artist, index) => (
          <Grid item key={index} sx={{ width: '50%' }}>
            <ArtistSearchResult artist={artist} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const ArtistDirectoryPage = ({ categories, artists }) => {
  const sortedCategories = useMemo(
    () => sortBy(categories, 'name'),
    [categories]
  );

  // Group artists by category.
  const artistsByCategory = useMemo(
    () =>
      sortedCategories.reduce((map, category) => {
        const categoryArtists = sortBy(
          artists.filter((artist) => {
            return artist.categories
              .map(({ _id }) => _id)
              .includes(category._id);
          }),
          ['lastName', 'firstName']
        );

        if (categoryArtists.length === 0) {
          return map;
        }

        return {
          ...map,
          [category._id]: categoryArtists
        };
      }, []),
    [sortedCategories, artists]
  );

  return (
    <>
      <Head>
        <title>Artist Directory</title>
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
                margin: '1.5rem auto',
                maxWidth: '720px'
              },
              '& p': {
                fontSize: '1.5rem',
                fontStyle: 'italic',
                color: 'rgba(0, 0, 0, 0.6)'
              }
            }}
          >
            <h1>Artist Directory</h1>
            <p>
              Search by Type of Artist, Tags, Hireable Skills, or whatever you
              need.
            </p>
          </Box>
        </Layout.Intro>
        <Card elevation={6}>
          <Search />
        </Card>
        <Box sx={{ mt: '4rem' }}>
          {sortedCategories.map((category, index) => (
            <Category
              key={index}
              category={category}
              artists={artistsByCategory[category._id]}
            />
          ))}
        </Box>
      </Layout>
    </>
  );
};

export async function getServerSideProps() {
  const httpClient = new HttpClient({
    baseUrl: process.env.DIRECTORY_API_URL
  });
  const [categories, artists] = await Promise.all([
    httpClient.get('/categories'),
    httpClient.get('/artists')
  ]);

  return {
    props: {
      categories,
      artists
    }
  };
}

export default ArtistDirectoryPage;
