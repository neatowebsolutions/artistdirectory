import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';
import classes from './Thumbnail.module.scss';

function Thumbnail({ upload }) {
  return (
    <Box sx={{ position: 'relative' }}>
      <Card
        className={classes.uploadThumbnail}
        style={{ borderRadius: 10, padding: 0 }}
        elevation={2}
      >
        <img
          src={upload.preview}
          className={classes.uploadedImage}
          alt={upload.name}
        />
      </Card>

      <IconButton className={classes.delete}>
        <DeleteOutlineIcon sx={{ color: 'primary' }} />
      </IconButton>
    </Box>
  );
}

export default Thumbnail;
