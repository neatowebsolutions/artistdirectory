import React, { useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import HttpClient from '@artistdirectory/http-client';
import { sortBy } from 'lodash';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import EastIcon from '@mui/icons-material/East';
import Grid from '@mui/material/Grid';
import { Layout, Search, ArtistSearchResult } from '../../components';
import classes from './index.module.scss';

const Category = ({ category, artists }) => {
  if (!artists?.length) {
    return null;
  }

  return (
    <div>
      <h2 className={classes.categoryHeading}>
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
    </div>
  );
};

const ArtistDirectoryPage = ({ categories, artists, tags, skills }) => {
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
        <Layout.Intro className={classes.intro}>
          <h1 className={classes.heading}>Artist Directory</h1>
          <p className={classes.description}>
            Search by Type of Artist, Tags, Hireable Skills, or whatever you
            need.
          </p>
        </Layout.Intro>
        <Card elevation={6}>
          <Search categories={categories} tags={tags} skills={skills} />
        </Card>
        <div className={classes.results}>
          {sortedCategories.map((category, index) => (
            <Category
              key={index}
              category={category}
              artists={artistsByCategory[category._id]}
            />
          ))}
        </div>
      </Layout>
    </>
  );
};

export async function getServerSideProps() {
  const httpClient = new HttpClient({
    baseUrl: process.env.DIRECTORY_API_URL
  });
  const [categories, artists, tags, skills] = await Promise.all([
    httpClient.get('/categories'),
    httpClient.get('/artists'),
    httpClient.get('/tags'),
    httpClient.get('/skills')
  ]);

  return {
    props: {
      categories,
      artists,
      tags,
      skills
    }
  };
}

export default ArtistDirectoryPage;
