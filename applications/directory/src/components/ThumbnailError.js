import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';

function ThumbnailError({ fileName, handleDelete }) {
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
          borderColor: 'secondary.main'
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
            textAlign: 'center'
          }}
        >
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              '& img:first-child': {
                width: '7.18rem'
              },
              '& img:last-child': {
                position: 'absolute',
                height: '1.875rem',
                right: '10%',
                bottom: '0'
              }
            }}
          >
            <img src="/images/img-sadface.svg" alt="Sad Face" />
            <img src="/images/img-sync-black-24-dp.svg" alt="refresh" />
          </Box>
          <Box
            sx={{
              '& p': {
                typography: 'body1',
                margin: 0,
                textAlign: 'center',
                fontSize: ['0.639rem', '0.75rem', '0.75rem', '0.75rem']
              }
            }}
          >
            <p>
              Uh oh! Your image didn’t upload right. <br />
              Try again!
            </p>
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
            background: 'rgb(205, 205, 205)'
          }
        }}
      >
        <DeleteOutlineIcon sx={{ color: 'primary.main', width: '1.25rem' }} />
      </IconButton>
    </Box>
  );
}

export default ThumbnailError;
