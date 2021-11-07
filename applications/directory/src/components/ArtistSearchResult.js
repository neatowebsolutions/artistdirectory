import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Stack from '@mui/material/Stack';
import { Chip } from '@mui/material';

const ArtistSearchResult = ({ artist }) => (
  <Card elevation={4}>
    <Stack direction="row" alignItems="flex-start" spacing={2}>
      <img src={artist.img} alt={artist.name} />
      <Stack spacing={2}>
        <div>
          {`${artist.firstName} ${artist.LastName ?? ''}`}
          <IconButton>
            <ArrowForwardIcon color="error" />
          </IconButton>
        </div>
        <div>
          {artist.skills ? (
            artist.skills.map((skill, index) => {
              if (index < 2) {
                return <div key={skill._id}>{skill}</div>;
              } else {
                return false;
              }
            })
          ) : (
            <></>
          )}
        </div>
        <div>
          {artist.tags ? (
            artist.tags.map((tag, index) => {
              if (index < 3) {
                return <Chip key={tag._id} label={tag} sx={{ mr: 1 }} />;
              } else if (index === 3 && artist.tags.length > 3) {
                return <Chip label={`+${artist.tags.length - index} more`} />;
              } else {
                return false;
              }
            })
          ) : (
            <></>
          )}
        </div>
      </Stack>
    </Stack>
  </Card>
);

ArtistSearchResult.propTypes = {
  artist: PropTypes.object.isRequired
};

export default ArtistSearchResult;
