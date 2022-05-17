import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';

function ThumbnailLoading({ fileName, handleDelete }) {
  return (
    <Box sx={{ position: 'relative' }}>
      <Card
        sx={{
          borderRadius: '10px',
          padding: 0,
          overflow: 'unset',
          minHeight: '14rem',
          display: 'flex',
          justifyContent: ' center',
          alignItems: 'center',
          border: ' 2px solid',
          borderColor: 'secondary.main',
        }}
        elevation={2}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            minHeight: '14rem',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              fontSize: '10px',
              textIndent: '-9999em',
              border: '0.75em solid #8a9918',
              borderLeft: '0.75em solid #ffffff',
              transform: 'translateZ(0)',
              animation: 'load8 1.2s infinite linear',
              borderRadius: '50%',
              width: '7em',
              height: '7em',
              '&:after': {
                borderRadius: '50%',
                width: '7em',
                height: '7em',
              },
            }}
          ></Box>
          <Box
            sx={{
              '& p': {
                typography: 'body1',
                margin: 0,
                textAlign: 'center',
                fontSize: ['0.639rem', '0.75rem', '0.75rem', '0.75rem'],
              },
            }}
          >
            <p>Uploading, give us a second…</p>
          </Box>
        </Box>
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
            background: 'rgb(205, 205, 205)',
          },
        }}
      >
        <DeleteOutlineIcon sx={{ color: 'primary.main', width: '1.25rem' }} />
      </IconButton>
    </Box>
  );
}

export default ThumbnailLoading;
