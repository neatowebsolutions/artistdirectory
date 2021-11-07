import React, { useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import HttpClient from '@artistdirectory/http-client';
import { groupBy } from 'lodash';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import EastIcon from '@mui/icons-material/East';
import Grid from '@mui/material/Grid';
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
    <Grid container spacing={2}>
      {artists.map((artist, artistIndex) => (
        <Grid item key={artistIndex} sx={{ width: '50%' }}>
          <ArtistSearchResult artist={artist} />
        </Grid>
      ))}
    </Grid>
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
  const artists = [
    {
      _id: '6187db3040c7677f16cf21c0',
      firstName: 'Bethany',
      lastName: 'Pearson',
      email: 'hello@bethanypaquette.com',
      city: 'Grand Rapids',
      social: {
        website: 'http://bethanypaquette.com',
        behance: '@bethanypaquette'
      },
      img: 'http://placekitten.com/160',
      artistType: 'Graphic Artist',
      description:
        'Esse officia enim quis minim eiusmod adipisicing commodo dolor est enim mollit in dolor. Do Lorem ex ullamco ea nisi. Non aliqua exercitation ex minim in minim elit. Tempor laboris incididunt non eu do enim laborum aute proident duis. Laborum veniam fugiat eiusmod aute id cillum cillum magna reprehenderit aute officia consequat ullamco elit. Officia deserunt et laborum velit mollit exercitation ea quis et veniam.',
      category: 'Visual Artist',
      keywords: ['one', 'two', 'three'],
      skills: ['UI', 'UX', 'Branding', 'Web Design', 'Graphic Design'],
      subscribedToNewsletter: false,
      tags: ['Awesome', 'Talented']
    },
    {
      _id: '6187db3040c7677f16cf21c0',
      firstName: 'Eli',
      lastName: 'Lemons',
      email: 'hello@elilemons.com',
      city: 'Grand Rapids',
      social: {
        website: 'http://elilemons.com',
        behance: '@elilemons'
      },
      img: 'http://placekitten.com/160',
      artistType: 'Pixel Artist',
      description:
        'Esse officia enim quis minim eiusmod adipisicing commodo dolor est enim mollit in dolor. Do Lorem ex ullamco ea nisi. Non aliqua exercitation ex minim in minim elit. Tempor laboris incididunt non eu do enim laborum aute proident duis. Laborum veniam fugiat eiusmod aute id cillum cillum magna reprehenderit aute officia consequat ullamco elit. Officia deserunt et laborum velit mollit exercitation ea quis et veniam.',
      category: 'Visual Artist',
      keywords: ['one', 'two', 'three'],
      skills: ['Web Design', 'Graphic Design'],
      subscribedToNewsletter: false,
      tags: [
        'Figurative',
        'Multiples',
        'Artist',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7'
      ]
    },
    {
      _id: '6187db3040c7677f16cf21c0',
      firstName: 'Sonrisa',
      lastName: 'Gonzalez',
      email: 'hello@sonrisa.com',
      city: 'Grand Rapids',
      social: {
        website: 'http://sonrisa.com',
        behance: '@elilemons'
      },
      img: 'http://placekitten.com/160',
      artistType: 'Tattoo Artist',
      description:
        'Esse officia enim quis minim eiusmod adipisicing commodo dolor est enim mollit in dolor. Do Lorem ex ullamco ea nisi. Non aliqua exercitation ex minim in minim elit. Tempor laboris incididunt non eu do enim laborum aute proident duis. Laborum veniam fugiat eiusmod aute id cillum cillum magna reprehenderit aute officia consequat ullamco elit. Officia deserunt et laborum velit mollit exercitation ea quis et veniam.',
      category: 'Visual Artist',
      keywords: ['one', 'two', 'three'],
      skills: ['Web Design', 'Graphic Design'],
      subscribedToNewsletter: false,
      tags: ['Experimental', 'Oddities', 'Oil paint']
    },
    {
      _id: '6187db3040c7677f16cf21c0',
      firstName: 'Laura',
      lastName: 'Gonzalez',
      email: 'hello@gonzalez.com',
      city: 'Grand Rapids',
      social: {
        website: 'http://gonzalez.com',
        behance: '@elilemons'
      },
      img: 'http://placekitten.com/160',
      artistType: 'Designer',
      description:
        'Esse officia enim quis minim eiusmod adipisicing commodo dolor est enim mollit in dolor. Do Lorem ex ullamco ea nisi. Non aliqua exercitation ex minim in minim elit. Tempor laboris incididunt non eu do enim laborum aute proident duis. Laborum veniam fugiat eiusmod aute id cillum cillum magna reprehenderit aute officia consequat ullamco elit. Officia deserunt et laborum velit mollit exercitation ea quis et veniam.',
      category: 'Visual Artist',
      keywords: ['one', 'two', 'three'],
      skills: ['UI', 'Web Design', 'Graphic Design'],
      subscribedToNewsletter: false,
      tags: ['Experimental', 'Oddities']
    }
  ];
  // const httpClient = new HttpClient({
  //   baseUrl: process.env.DIRECTORY_API_URL
  // });
  // const artists = await httpClient.get('/artists');

  return {
    props: {
      artists
    }
  };
}

export default ArtistDirectoryPage;
