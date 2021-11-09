import { useDropzone } from 'react-dropzone';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InfoIcon from '@mui/icons-material/Info';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Thumbnail from './Thumbnail';
// import ThumbnailError from './ThumbnailError';
// import ThumbnailLoading from './ThumbnailLoading';
import classes from './Upload.module.scss';

function Upload() {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 5,
    maxSize: 2097152,
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    },
    onDropRejected: (fileRejections) => {
      console.log(fileRejections);
    }
  });

  const thumbs = files.map((file) => (
    <Thumbnail key={file.name} upload={file} />
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <Box>
      <h2 className="cardTitle">Work</h2>
      <p className="fieldTitle">
        Add up to 5 images of your work - up to 2mb in size
        <span className="required">*</span>
      </p>
      <p className="example">At least 1 image of your work is required.</p>

      <div>
        <div {...getRootProps({ className: `dropzone ${classes.dropUpload}` })}>
          <div>
            <img src="/images/img-artupload.svg" alt="Art Upload Frame" />
          </div>
          <input {...getInputProps()} />
          <div className={classes.browse}>
            <p>Drag and drop here, or</p>
            <Button variant="contained" disableElevation>
              Browse
            </Button>
          </div>
        </div>
        <Box sx={{ marginTop: '25px' }}>
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
        </Box>
        <Box
          sx={{
            marginTop: '25px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            columnGap: '20px',
            rowGap: '25px'
          }}
        >
          {thumbs}
        </Box>
      </div>
    </Box>
  );
}

export default Upload;
