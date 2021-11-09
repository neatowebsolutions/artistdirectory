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
        style={{ padding: 0, borderRadius: 10 }}
        elevation={2}
      >
        <img src={upload.preview} alt={upload.name} />
      </Card>

      <IconButton className="delete">
        <DeleteOutlineIcon sx={{ color: 'primary.main', width: 20 }} />
      </IconButton>
    </Box>
  );
}

export default Thumbnail;
