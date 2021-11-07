import Card from '@mui/material/Card';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';
import classes from './Thumbnail.module.scss';

function Thumbnail() {
  // if (img) {
  //   return (
  //     <Card
  //       className={classes.uploadThumbnail}
  //       style={{ borderRadius: 10, padding: 0, overflow: 'unset' }}
  //       elevation={2}
  //     >
  //       <img
  //         src="/images/img-2.png"
  //         className={classes.uploadedImage}
  //         alt={'img.title'}
  //       />
  //       <div className={classes.delete}>
  //         <IconButton>
  //           <DeleteOutlineIcon sx={{ color: 'primary' }} />
  //         </IconButton>
  //       </div>
  //     </Card>
  //   );
  // }
  // if (status) {
  //   return (
  //     <Card
  //       className={`${classes.uploadThumbnail} ${classes.errorBorder}`}
  //       style={{ borderRadius: 10, padding: 0, overflow: 'unset' }}
  //       elevation={2}
  //     >
  //       <div className={classes.loading}>
  //         <div className={classes.loader}></div>
  //         <div>
  //           <p>
  //             Uploading, <br />
  //             give us a second…
  //           </p>
  //         </div>
  //       </div>
  //       <div className={classes.delete}>
  //         <IconButton>
  //           <DeleteOutlineIcon sx={{ color: 'primary' }} />
  //         </IconButton>
  //       </div>
  //     </Card>
  //   );
  // }
  // if (error) {
  //   return (
  //     <Card
  //       className={`${classes.uploadThumbnail} ${classes.errorBorder}`}
  //       style={{ borderRadius: 10 }}
  //       elevation={2}
  //     >
  //       <div className={classes.loading}>
  //         <div className={classes.errorImage}>
  //           <img
  //             className={classes.sadImage}
  //             src="/images/img-sadface.svg"
  //             alt="Sad Face"
  //           />
  //           <img
  //             src="/images/img-sync-black-24-dp.svg"
  //             className={classes.refresh}
  //             alt="refresh"
  //           />
  //         </div>
  //         <div>
  //           <p>
  //             Uh oh! Your image didn’t upload right. <br />
  //             Try again!
  //           </p>
  //         </div>
  //         <div className={classes.delete}>
  //           <IconButton>
  //             <DeleteOutlineIcon sx={{ color: 'primary' }} />
  //           </IconButton>
  //         </div>
  //       </div>
  //     </Card>
  //   );
  // }
  return (
    <Card
      className={classes.uploadThumbnail}
      style={{ borderRadius: 10, padding: 0, overflow: 'unset' }}
      elevation={2}
    >
      <img
        src="/images/img-2.png"
        className={classes.uploadedImage}
        alt={'img.title'}
      />
      <div className={classes.delete}>
        <IconButton>
          <DeleteOutlineIcon sx={{ color: 'primary' }} />
        </IconButton>
      </div>
    </Card>
  );
}

export default Thumbnail;
