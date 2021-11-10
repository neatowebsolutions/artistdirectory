import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';

function Thumbnail({ upload }) {
  return (
    <Box sx={{ position: 'relative' }}>
      <Card
        sx={{
          minHeight: '225px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 0,
          borderRadius: '10px',
          '& img': {
            width: '100%',
            height: '100%',
            minHeight: '225px',
            objectFit: 'cover'
          }
        }}
        elevation={2}
      >
        <img src={upload.preview} alt={upload.name} />
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

export default Thumbnail;
