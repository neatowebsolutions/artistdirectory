import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';
import classes from './ThumbnailError.module.scss';

function ThumbnailError() {
  return (
    <Box sx={{ position: 'relative' }}>
      <Card
        className="thumbnail"
        style={{ padding: 0, borderRadius: 10 }}
        elevation={2}
      >
        <div className={classes.error}>
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

      <IconButton className="delete">
        <DeleteOutlineIcon sx={{ color: 'primary.main', width: 20 }} />
      </IconButton>
    </Box>
  );
}

export default ThumbnailError;
