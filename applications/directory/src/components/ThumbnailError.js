import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';
import classes from './Thumbnail.module.scss';

function ThumbnailError({ upload }) {
  return (
    <Box sx={{ position: 'relative' }}>
      <Card
        className={`${classes.uploadThumbnail} ${classes.errorBorder}`}
        style={{ borderRadius: 10, padding: 0 }}
        elevation={2}
      >
        <div className={classes.loading}>
          <div className={classes.errorImage}>
            <img
              className={classes.sadImage}
              src="/images/img-sadface.svg"
              alt="Sad Face"
            />
            <img
              src="/images/img-sync-black-24-dp.svg"
              className={classes.refresh}
              alt="refresh"
            />
          </div>
          <div>
            <p>
              Uh oh! Your image didn’t upload right. <br />
              Try again!
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

export default ThumbnailError;
