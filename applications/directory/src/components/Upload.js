import Button from '@mui/material/Button';
import InfoIcon from '@mui/icons-material/Info';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import classes from './Upload.module.scss';

function Upload() {
  return (
    <div>
      <p className={classes.fieldTitle}>
        Add up to 5 images of your work - up to 2mb in size
        <span className={classes.required}>*</span>
      </p>
      <p className={classes.example}>
        At least 1 image of your work is required.
      </p>
      <div className={classes.dropUpload}>
        <div>
          <img src="/images/img-artupload.svg" alt="Art Upload Frame" />
        </div>
        <div className={classes.browse}>
          <p>Drag and drop here, or</p>
          <Button variant="contained" disableElevation>
            Browse
          </Button>
        </div>
      </div>
      <div className={classes.alertArea}>
        <Stack>
          <Alert
            variant="outlined"
            icon={<InfoIcon sx={{ color: '#3d748a' }} />}
            onClose={() => {}}
            sx={{
              backgroundColor: '#ebf1f3',
              border: 'solid 1px #3d748a',
              color: 'rgba(0, 0, 0, 0.87)'
            }}
          >
            Looks like you have the maximum 5 images uploaded to your profile.{' '}
          </Alert>
        </Stack>
      </div>
      <div className={classes.uploadArea}>{/* <Thumbnail /> */}</div>
    </div>
  );
}

export default Upload;
