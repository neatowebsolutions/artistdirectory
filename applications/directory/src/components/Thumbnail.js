import { useEffect } from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';

function Thumbnail({ preview, handleDelete, fileName }) {
  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      URL.revokeObjectURL(preview);
    },
    [preview]
  );

  return (
    <Box sx={{ position: 'relative' }}>
      <Card
        sx={{
          minHeight: '14rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 0,
          borderRadius: '10px',
          '& img': {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            // atl styling
            fontSize: '0.875rem',
            margin: '0 1rem'
          }
        }}
        elevation={2}
      >
        <img src={preview} alt={fileName} />
      </Card>

      <IconButton
        onClick={() => handleDelete(fileName)}
        sx={{
          position: 'absolute',
          top: '-0.94rem',
          right: '-0.94rem',
          height: '1.875rem',
          width: '1.875rem',
          background: '#fff',
          boxShadow:
            '0 1px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 3px -2px rgba(0, 0, 0, 0.12),0 3px 4px 0 rgba(0, 0, 0, 0.14)',
          '&:hover': {
            background: 'rgb(205, 205, 205)'
          }
        }}
      >
        <DeleteOutlineIcon sx={{ color: 'primary.main', width: '1.25rem' }} />
      </IconButton>
    </Box>
  );
}

export default Thumbnail;
