import React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Stack from '@mui/material/Stack';
import { Chip } from '@mui/material';

const ArtistSearchResult = ({ artist }) => {
  const { firstName, lastName, skills, tags, photoUrls } = artist;

  return (
    <Card elevation={4}>
      <Stack direction="row" alignItems="flex-start" spacing={2}>
        <Box
          as="img"
          src={photoUrls?.[0]}
          alt={`${firstName} ${lastName}`}
          sx={{
            maxWidth: '160px',
            height: 'auto'
          }}
        />
        <Stack spacing={2}>
          <Box
            sx={{
              fontSize: '1.375rem',
              fontWeight: 'bold'
            }}
          >
            {`${firstName} ${lastName}`}
            <IconButton>
              <ArrowForwardIcon color="error" />
            </IconButton>
          </Box>
          <div>
            {skills.length > 0 &&
              skills
                .map((skill, index) => {
                  if (index < 2) {
                    return (
                      <Box
                        key={skill._id}
                        sx={{
                          fontSize: '1.25rem'
                        }}
                      >
                        {skill.name}
                      </Box>
                    );
                  } else {
                    return false;
                  }
                })
                .filter(Boolean)}
          </div>
          <div>
            {tags.length > 0 &&
              tags
                .map((tag, index) => {
                  if (index < 3) {
                    return (
                      <Chip key={tag._id} label={tag.name} sx={{ mr: 1 }} />
                    );
                  } else if (index === 3 && tags.length > 3) {
                    return <Chip label={`+${tags.length - index} more`} />;
                  } else {
                    return false;
                  }
                })
                .filter(Boolean)}
          </div>
        </Stack>
      </Stack>
    </Card>
  );
};

ArtistSearchResult.propTypes = {
  artist: PropTypes.object.isRequired
};

export default ArtistSearchResult;
