import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';

function ThumbnailLoading() {
  return (
    <Box sx={{ position: 'relative' }}>
      <Card
        sx={{
          borderRadius: '10px',
          padding: 0,
          overflow: 'unset',
          minHeight: '225px',
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
            minHeight: '225px'
          }}
        >
          <Box
            sx={{
              fontSize: '10px',
              position: 'relative',
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
                height: '7em'
              }
            }}
          ></Box>
          <Box
            sx={{
              '& p': {
                margin: 0,
                textAlign: 'center',
                typography: 'body1',
                fontSize: '16px'
              }
            }}
          >
            <p>Uploading, give us a second…</p>
          </Box>
        </Box>
      </Card>

      <IconButton
        sx={{
          position: 'absolute',
          top: '-15px',
          right: '-15px',
          height: '30px',
          width: '30px',
          background: '#fff',
          boxShadow:
            '0 1px 8px 0 rgba(0, 0, 0, 0.2), 0 3px 3px -2px rgba(0, 0, 0, 0.12),0 3px 4px 0 rgba(0, 0, 0, 0.14)',
          '&:hover': {
            background: 'rgb(205, 205, 205)'
          }
        }}
      >
        <DeleteOutlineIcon sx={{ color: 'primary.main', width: 20 }} />
      </IconButton>
    </Box>
  );
}

export default ThumbnailLoading;
