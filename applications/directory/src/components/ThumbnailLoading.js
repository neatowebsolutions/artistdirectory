import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';
import classes from './ThumbnailLoading.module.scss';

function ThumbnailLoading() {
  return (
    <Box sx={{ position: 'relative' }}>
      <Card
        className="thumbnail"
        style={{
          borderRadius: 10,
          padding: 0,
          overflow: 'unset'
        }}
        elevation={2}
      >
        <div className={classes.loading}>
          <div className={classes.loader}></div>
          <div>
            <p>Uploading, give us a second…</p>
          </div>
        </div>
      </Card>

      <IconButton className="delete">
        <DeleteOutlineIcon sx={{ color: 'primary.main', width: 20 }} />
      </IconButton>
    </Box>
  );
}

export default ThumbnailLoading;
