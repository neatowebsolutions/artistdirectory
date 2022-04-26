// TODO - make dropzone only accept one file at a time??

import { useDropzone } from 'react-dropzone';
import { useState, useEffect } from 'react';
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

const acceptedFileTypes = [
  'image/x-png',
  'image/png',
  'image/jpg',
  'image/jpeg',
  'image/gif'
];

function Upload({ getFiles, files }) {
  // const [files, setFiles] = useState([]); // TODO send initial value from parent component??

  const [errorMessage, setErrorMessage] = useState('');
  const { getSignedProfileUrl, uploadFile } = useUpload();

  const verifyFile = (filesToVerify) => {
    if (filesToVerify && filesToVerify.length > 0) {
      const isValid = filesToVerify.every((currentFile) => {
        // Get info about file because currentFile for rejected files is an object with properties: file and error
        currentFile = currentFile.file ? currentFile.file : currentFile;
        const { size: currentFileSize, type: currentFileType } = currentFile;

        if (currentFileSize > imageMaxSize) {
          setErrorMessage('File is too large');
          return false;
        }

        // Do we need this check??
        if (!acceptedFileTypes.includes(currentFileType)) {
          setErrorMessage('This file is not allowed. Only images are allowed.');
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
          // check if the number of provided files exceeds maximum file number
          // TODO - check if uploaded successfully files number is less than maxfilesNumber
          const uploadedImagesNum = files.reduce(
            (acc, { uploadError, loading }) => {
              if (!uploadError && !loading) {
                return acc + 1;
              }
              return acc;
            },
            0
          );

          if (uploadedImagesNum + acceptedFiles.length > maxFilesNumber) {
            setErrorMessage(
              'Looks like you have the maximum 5 images uploaded to your profile.'
            );
            return false;
          }

          if (files.length >= 10) {
            setErrorMessage(
              'Looks like file uploading does not work. Try again later.'
            );
            return false;
          }
          setErrorMessage('');
          const parsedFiles = acceptedFiles.map((file) => {
            return {
              file: Object.assign(file, {
                preview: URL.createObjectURL(file),
              }),
              loading: true, // for displaying loading state of the chosen image
              uploadError: false, //  for displaying error if upload fails
            };
          });

          // delete duplicates from files // TODO - display error if files with the same names are being uploaded ???
          const noneDuplicate = files.filter(({ file: { name } }) => {
            const res = parsedFiles.find((item) => name === item.file.name);
            return res?.file.name !== name;
          });
          // update files list to show loading state for accepted files
          await getFiles([...noneDuplicate, ...parsedFiles]);

          // request signed url
          const getSignedUrlsAcceptedFiles = (filesArray) => {
            const promises = filesArray.map(async (item) => {
              const { file } = item;
              const { data, error } = await getSignedProfileUrl(file.type);
              return {
                ...item,
                file,
                signedUrl: data?.signedUrl, // TODO - what is the problem with data?
                signedUrlError: error,
              };
            });
            return Promise.all(promises);
          };

          const filesToUpload = await getSignedUrlsAcceptedFiles(parsedFiles);

          // upload files to the received signedURLs
          const uploadAcceptedFiles = (filesArray) => {
            const promises = filesArray.map(async (item) => {
              const { file, signedUrl } = item;
            
              if (signedUrl) {
                const { uploadedImageUrl, error } = await uploadFile(
                  signedUrl,
                  file
                );
                return {
                  ...item,
                  uploadedImageUrl,
                  loading: false,
                  uploadError: error,
                };
              }
              return item;
            });
            return Promise.all(promises);
          };

          const uploadedImageUrls = await uploadAcceptedFiles(filesToUpload);

          await getFiles([...noneDuplicate, ...uploadedImageUrls]);
        }
      }
    },
  });

  // TODO make changes to due to object structure change (done)
  const handleFileDelete = (fileName) => {
    getFiles(files.filter(({ file }) => file.name !== fileName));
  };

  // const thumbs = files.map(({ file }, index) => (
  //   <Thumbnail
  //     key={`${file.name}-${index}`}
  //     upload={file}
  //     handleDelete={handleFileDelete}
  //   />
  // ));

  const thumbs = files.map(
    ({ loading, uploadError, uploadedImageUrl, file }, index) => {
      if (loading) {
        return <ThumbnailLoading key={`${file.name}-${index}`} />;
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
        // TODO - change delete image function
        <Thumbnail
          key={`${file.name}-${index}`}
          uploadUrl={uploadedImageUrl}
          fileName={file.name}
          handleDelete={handleFileDelete}
        />
      );
    }
  );

  // TODO - change if files object structure is changed
  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(({ file }) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <Box
      sx={{
        '& h2.cardTitle': {
          typography: 'body1',
          fontSize: '20px',
          fontWeight: '500',
        },
        '& p': {
          typography: 'body2',
          fontSize: '20px',
          lineHeight: '1.2',
          letterSpacing: '0.15px',
          '& span': {
            color: 'primary.main',
          },
        },
        '& p.example': {
          fontStyle: 'italic',
        },
      }}
    >
      <h2 className="cardTitle">Work</h2>
      <p className="fieldTitle">
        Add up to 5 images of your work - up to 2mb in size
        <span className="required">*</span>
      </p>
      <p className="example">At least 1 image of your work is required.</p>

      <Box
        sx={{
          width: '100%',
          border: '2px dashed',
          borderColor: 'primary.main',
          borderRadius: '4px',
          height: '250px',
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
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            '& p': {
              fontSize: '20px',
              textAlign: 'center',
              margin: '10px 15px 10px 0',
            },
          }}
        >
          <p>Drag and drop here, or</p>
          <Button variant="contained" disableElevation>
            Browse
          </Button>
        </Box>
      </Box>
      {/* TODO: Should user be able to close alert window?  */}
      {errorMessage && (
        <Box sx={{ marginTop: '25px' }}>
          <Stack>
            <Alert
              variant="outlined"
              icon={<InfoIcon sx={{ color: '#3d748a' }} />}
              onClose={() => {}}
              sx={{
                backgroundColor: '#ebf1f3',
                border: 'solid 1px #3d748a',
                color: 'rgba(0, 0, 0, 0.87)',
                typography: 'body1',
                fontSize: '16px',
              }}
            >
              {errorMessage}
            </Alert>
          </Stack>
        </Box>
      )}

      <Box
        sx={{
          marginTop: '25px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          columnGap: '20px',
          rowGap: '25px',
        }}
      >
        {thumbs}
      </Box>
    </Box>
  );
}

export default Upload;

// import { useDropzone } from "react-dropzone";
// import { useState, useEffect, useCallback } from "react";
// import Button from "@mui/material/Button";
// import Box from "@mui/material/Box";
// import InfoIcon from "@mui/icons-material/Info";
// import Alert from "@mui/material/Alert";
// import Stack from "@mui/material/Stack";
// import Thumbnail from "./Thumbnail";
// // import ThumbnailError from './ThumbnailError';
// // import ThumbnailLoading from './ThumbnailLoading';

// const maxFilesNumber = 5;
// const imageMaxSize = 2097152;

// // TODO - do we need file type verification?
// // const acceptedFileTypes =
// //   "image/x-png, image/png, image/jpg, image/jpeg, image/gif";
// // const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {
// //   return item.trim();
// // });
// function Upload(getFiles, handleFilesReset) {
//   const [files, setFiles] = useState([]);
//   const [errorMessage, setErrorMessage] = useState("");

//   const verifyFile = (filesToVerify) => {
//     if (filesToVerify && filesToVerify.length > 0) {
//       const isValid = filesToVerify.every((currentFile) => {
//         // Get info about file because currentFile for rejected files is an object with properties: file and error
//         currentFile = currentFile.file ? currentFile.file : currentFile;
//         const {
//           size: currentFileSize,
//           // type: currentFileType,
//         } = currentFile;

//         if (currentFileSize > imageMaxSize) {
//           setErrorMessage("File is too large");
//           return false;
//         }
//         return true;
//         // Do we need this check??
//         // if (!acceptedFileTypesArray.includes(currentFileType)) {
//         //   setErrorMessage("This file is not allowed. Only images are allowed.");
//         //   return false;
//         // }
//       });

//       if (!isValid) return false;
//       setErrorMessage("");
//       return true;
//     }
//   };

//   const { getRootProps, getInputProps } = useDropzone({
//     maxFiles: maxFilesNumber,
//     maxSize: imageMaxSize,
//     multiple: true,
//     accept: "image/*",

//     onDrop: (acceptedFiles, rejectedFiles) => {
//       if (rejectedFiles && rejectedFiles.length > 0) {
//         verifyFile(rejectedFiles);
//       }

//       if (acceptedFiles && acceptedFiles.length > 0) {
//         const isVerified = verifyFile(acceptedFiles);
//         if (isVerified) {
//           // check if the number of provided files exceeds maximum file number
//           if (files.length + acceptedFiles.length > maxFilesNumber) {
//             setErrorMessage(
//               "Looks like you have the maximum 5 images uploaded to your profile."
//             );
//             return false;
//           }
//           setErrorMessage("");
//           const parsedFiles = acceptedFiles.map((file) =>
//             Object.assign(file, {
//               preview: URL.createObjectURL(file),
//             })
//           );
//           // delete duplicates from files
//           const noneDuplicate = files.filter(({ name }) => {
//             const res = parsedFiles.find((item) => name === item.name);
//             return res?.name !== name;
//           });
//           setFiles([...noneDuplicate, ...parsedFiles]);
//           getFiles(files);
//         }
//       }
//     },
//   });

//   const handleFileDelete = (fileName) => {
//     setFiles(files.filter((file) => file.name !== fileName));
//   };

//   const thumbs = files.map((file) => (
//     <Thumbnail key={file.name} upload={file} handleDelete={handleFileDelete} />
//   ));

//   useEffect(
//     () => () => {
//       // Make sure to revoke the data uris to avoid memory leaks
//       files.forEach((file) => URL.revokeObjectURL(file.preview));
//     },
//     [files]
//   );

//   return (
//     <Box
//       sx={{
//         "& h2.cardTitle": {
//           typography: "body1",
//           fontSize: "20px",
//           fontWeight: "500",
//         },
//         "& p": {
//           typography: "body2",
//           fontSize: "20px",
//           lineHeight: "1.2",
//           letterSpacing: "0.15px",
//           "& span": {
//             color: "primary.main",
//           },
//         },
//         "& p.example": {
//           fontStyle: "italic",
//         },
//       }}
//     >
//       <h2 className="cardTitle">Work</h2>
//       <p className="fieldTitle">
//         Add up to 5 images of your work - up to 2mb in size
//         <span className="required">*</span>
//       </p>
//       <p className="example">At least 1 image of your work is required.</p>

//       <Box
//         sx={{
//           width: "100%",
//           border: "2px dashed",
//           borderColor: "primary.main",
//           borderRadius: "4px",
//           height: "250px",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "space-evenly",
//           alignItems: "center",
//           textAlign: "center",
//         }}
//         {...getRootProps({ className: "dropzone" })}
//       >
//         <Box>
//           <img src="/images/img-artupload.svg" alt="Art Upload Frame" />
//         </Box>
//         <input {...getInputProps()} />
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "center",
//             width: "100%",
//             "& p": {
//               fontSize: "20px",
//               textAlign: "center",
//               margin: "10px 15px 10px 0",
//             },
//           }}
//         >
//           <p>Drag and drop here, or</p>
//           <Button variant="contained" disableElevation>
//             Browse
//           </Button>
//         </Box>
//       </Box>
//       {/* TODO: Should user be able to close alert window?  */}
//       {errorMessage && (
//         <Box sx={{ marginTop: "25px" }}>
//           <Stack>
//             <Alert
//               variant="outlined"
//               icon={<InfoIcon sx={{ color: "#3d748a" }} />}
//               onClose={() => {}}
//               sx={{
//                 backgroundColor: "#ebf1f3",
//                 border: "solid 1px #3d748a",
//                 color: "rgba(0, 0, 0, 0.87)",
//                 typography: "body1",
//                 fontSize: "16px",
//               }}
//             >
//               {errorMessage}
//             </Alert>
//           </Stack>
//         </Box>
//       )}

//       <Box
//         sx={{
//           marginTop: "25px",
//           display: "grid",
//           gridTemplateColumns: "repeat(3, 1fr)",
//           columnGap: "20px",
//           rowGap: "25px",
//         }}
//       >
//         {thumbs}
//       </Box>
//     </Box>
//   );
// }

// export default Upload;
