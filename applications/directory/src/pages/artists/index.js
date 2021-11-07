import React, { useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import HttpClient from '@artistdirectory/http-client';
import { groupBy } from 'lodash';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import EastIcon from '@mui/icons-material/East';
import { Layout, Search, ArtistSearchResult } from '../../components';
import classes from './index.module.scss';

const Category = ({ category, artists = [] }) => (
  <div>
    <h2 className={classes.categoryHeading}>
      <span>{category}</span>
      <Link href={`/artists?category=${encodeURIComponent(category)}`} passHref>
        <Button component="a" color="primary" endIcon={<EastIcon />}>
          See more
        </Button>
      </Link>
    </h2>
    {artists.map((artist, artistIndex) => (
      <ArtistSearchResult key={artistIndex} artist={artist} />
    ))}
  </div>
);

const ArtistDirectoryPage = ({ artists }) => {
  const groupedArtists = useMemo(() => groupBy(artists, 'category'), [artists]);
  const categories = Object.keys(groupedArtists);

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
          <Search />
        </Card>
        <div className={classes.results}>
          {categories.map((category, index) => (
            <Category
              key={index}
              category={category}
              artists={groupedArtists[category]}
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
  const artists = await httpClient.get('/artists');

  return {
    props: {
      artists
    }
  };
}

export default ArtistDirectoryPage;
