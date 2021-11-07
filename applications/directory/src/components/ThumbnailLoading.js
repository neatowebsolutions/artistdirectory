import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';
import classes from './Thumbnail.module.scss';

function ThumbnailLoading() {
  return (
    <Box sx={{ position: 'relative' }}>
      <Card
        className={`${classes.uploadThumbnail} ${classes.errorBorder}`}
        style={{ borderRadius: 10, padding: 0, overflow: 'unset' }}
        elevation={2}
      >
        <div className={classes.loading}>
          <div className={classes.loader}></div>
          <div>
            <p>
              Uploading, <br />
              give us a second…
            </p>
          </div>
        </div>
      </Card>

      <IconButton className={classes.delete}>
        <DeleteOutlineIcon sx={{ color: 'primary' }} />
      </IconButton>
    </Box>
  );
}

export default ThumbnailLoading;
