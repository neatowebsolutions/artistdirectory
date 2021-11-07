import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';

const ArtistSearchResult = ({ artist }) => (
  <Card elevation={4}>
    <pre>{JSON.stringify(artist, null, 2)}</pre>
  </Card>
);

ArtistSearchResult.propTypes = {
  artist: PropTypes.object.isRequired
};

export default ArtistSearchResult;
