// TODO - make dropzone only accept one file at a time??
import { useDropzone } from 'react-dropzone';
import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InfoIcon from '@mui/icons-material/Info';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Thumbnail from './Thumbnail';
import { useUpload } from '../hooks';
import ThumbnailError from './ThumbnailError';
import ThumbnailLoading from './ThumbnailLoading';

const maxFilesNumber = 5;
const imageMaxSize = 2097152;
//const baseUrl = 'https://assets.artistdirectory.co/profile/';
const acceptedFileTypes = [
  'image/x-png',
  'image/png',
  'image/jpg',
  'image/jpeg',
  'image/gif',
];

const Upload = ({ getFiles, files, formError, errorsNum }) => {
  const [errorMessage, setErrorMessage] = useState(false);
  const { getSignedProfileUrl, uploadFile } = useUpload();

  const verifyFile = (filesToVerify) => {
    if (filesToVerify && filesToVerify.length > 0) {
      const isValid = filesToVerify.every((currentFile) => {
        // Get info about file because currentFile for rejected files is an object with properties: file and error
        currentFile = currentFile.file ? currentFile.file : currentFile;
        const { size: currentFileSize, type: currentFileType } = currentFile;

        if (!acceptedFileTypes.includes(currentFileType)) {
          setErrorMessage('This file is not allowed. Only images are allowed.');
          return false;
        }

        if (currentFileSize > imageMaxSize) {
          setErrorMessage('File is too large');
          return false;
        }

        return true;
      });

      if (!isValid) return false;
      setErrorMessage('');
      return true;
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: maxFilesNumber,
    maxSize: imageMaxSize,
    multiple: true,
    accept: 'image/*',
    onDrop: async (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles && rejectedFiles.length > 0) {
        verifyFile(rejectedFiles);
      }

      if (acceptedFiles && acceptedFiles.length > 0) {
        const isVerified = verifyFile(acceptedFiles);
        if (isVerified) {
          // find the number of uploaded files
          const uploadedImagesNum = files.reduce((acc, { uploaded }) => {
            if (uploaded) {
              return acc++;
            }
            return acc;
          }, 0);
          // check if the number of uploaded and chosen files exceeds maximum file number
          if (uploadedImagesNum + acceptedFiles.length > maxFilesNumber) {
            setErrorMessage(
              'You cannot upload more than 5 images to your profile.'
            );
            return false;
          }

          // checks if number of files in loading state and uploaded files exceeds 10
          if (files.length >= 10) {
            setErrorMessage(
              'Looks like file uploading does not work. Try again later.'
            );
            return false;
          }
          setErrorMessage('');
          const parsedFiles = acceptedFiles.map((file) => {
            return {
              file,
              loading: true, // for displaying loading state of the chosen image
              uploadError: false, //  for displaying error if upload fails
            };
          });

          // delete duplicates from files
          const noneDuplicate = files.filter(({ file: { name } }) => {
            const res = parsedFiles.find((item) => name === item.file.name);
            return res?.file.name !== name;
          });
          // update files list to show loading state for accepted files and error state should it occur
          await getFiles([...noneDuplicate, ...parsedFiles]);

          // request signed url
          const getSignedUrls = (filesArray) => {
            const promises = filesArray.map(async (item) => {
              const { file } = item;
              const { data, error } = await getSignedProfileUrl(file.type);
              return {
                ...item,
                signedUrl: data?.signedUrl,
                // fileUrl: data && `${baseUrl}${data.fileName}`,
                fileName: data?.fileName,
                signedUrlError: error,
              };
            });
            return Promise.all(promises);
          };

          const filesToUpload = await getSignedUrls(parsedFiles);

          // upload files to the received signedURLs
          const uploadFiles = (filesArray) => {
            const promises = filesArray.map(async (item) => {
              const { file, signedUrl } = item;
              if (signedUrl) {
                const { response, error } = await uploadFile(signedUrl, file);
                console.log(error);
                return {
                  ...item,
                  file: Object.assign(file, {
                    preview: URL.createObjectURL(file),
                  }),
                  uploaded: response && response.ok,
                  loading: false,
                  uploadError: error,
                };
              }
              return item;
            });
            return Promise.all(promises);
          };

          const uploadedImageUrls = await uploadFiles(filesToUpload);

          await getFiles([...noneDuplicate, ...uploadedImageUrls]);
        }
      }
    },
  });

  const handleFileDelete = (fileName) => {
    getFiles(files.filter(({ file }) => file.name !== fileName));
  };

  const thumbs = files.map(({ loading, uploadError, file }, index) => {
    if (loading) {
      return (
        <ThumbnailLoading
          key={`${file.name}-${index}`}
          handleDelete={handleFileDelete}
          fileName={file.name}
        />
      );
    }
    if (uploadError) {
      return (
        <ThumbnailError
          key={`${file.name}-${index}`}
          handleDelete={handleFileDelete}
          fileName={file.name}
        />
      );
    }
    return (
      <Thumbnail
        key={`${file.name}-${index}`}
        preview={file.preview}
        fileName={file.name}
        handleDelete={handleFileDelete}
      />
    );
  });

  return (
    <Box
      sx={{
        '& h2': {
          marginTop: ['1.5rem'],
        },
        '& h3': {
          marginTop: ['1rem'],
          marginBottom: ['.5rem'],
        },
        '& p': {
          fontStyle: 'italic',
          marginBottom: '1.5rem',
        },
        '& span': {
          color: 'primary.main',
        },
      }}
    >
      <Typography variant="h2" component="h2">
        Work
      </Typography>
      <Typography variant="h3" component="h3">
        Add up to 5 images of your work - up to 2mb in size
        <span>*</span>
      </Typography>
      <Typography variant="body1" component="p">
        At least 1 image of your work is required.
      </Typography>

      <Box
        sx={{
          width: '100%',
          border: '2px dashed',
          borderColor: 'primary.main',
          borderRadius: '4px',
          height: '15.62rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          textAlign: 'center',
        }}
        {...getRootProps({ className: 'dropzone' })}
      >
        <Box>
          <img src="/images/img-artupload.svg" alt="Art Upload Frame" />
        </Box>
        <input {...getInputProps()} />
        <Box
          sx={{
            display: 'flex',
            flexDirection: ['column', 'row'],
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            '& p': {
              typography: 'body1',
              fontSize: ['1rem', '1.25rem'],
              textAlign: 'center',
              fontStyle: 'normal',
              margin: '0.313rem .5rem 0.313rem 0',
            },
          }}
        >
          <Typography variant="body1" component="p">
            Drag and drop here, or
          </Typography>
          <Button
            variant="contained"
            disableElevation
            sx={{
              width: '6.625rem',
              height: '2.25rem',
              margin: ['0.5rem auto 0 auto', '0 0 0 1rem'],
            }}
          >
            Browse
          </Button>
        </Box>
      </Box>

      {(errorMessage || (formError && errorsNum === 1)) && (
        <Box sx={{ marginTop: '1.56rem' }}>
          <Stack>
            <Alert
              variant="outlined"
              icon={<InfoIcon sx={{ color: '#3d748a' }} />}
              onClose={() => setErrorMessage('')}
              sx={{
                backgroundColor: '#ebf1f3',
                border: 'solid 1px #3d748a',
                color: 'rgba(0, 0, 0, 0.87)',
                typography: 'body1',
                fontSize: ['.875rem', '.875rem', '.875rem', '.875rem'],
              }}
            >
              {errorMessage || formError}
            </Alert>
          </Stack>
        </Box>
      )}

      <Box
        sx={{
          marginTop: '1.56rem',
          display: 'grid',
          gridTemplateColumns: ['repeat(2, 1fr)', 'repeat(3, 1fr)'],
          columnGap: '1.25rem',
          rowGap: '1.56rem',
        }}
      >
        {thumbs}
      </Box>
    </Box>
  );
};

export default Upload;
