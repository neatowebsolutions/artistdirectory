import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import classes from './ProfileDetails.module.scss';

function ProfileDetails() {
  return (
    <Card className={classes.profileDetails}>
      <div className={classes.profileImage}>
        <img src="/images/placeholder.png" alt="Placeholder" />
      </div>
      <div className={classes.profileName}>
        <h3>Josephine Washington</h3>
        <h4>Member Since 2021</h4>
        <div className={classes.editButton}>
          <Button variant="text" startIcon={<EditIcon />} disableElevation>
            Edit Profile Picture
          </Button>
        </div>
      </div>
      <div className={classes.contactDetails}>
        <h3>Contact Details</h3>
        <div className={classes.detail}>
          <div className={classes.label}>
            <MailOutlineIcon
              sx={{
                fontSize: 18,
                marginRight: '5px',
                color: 'primary.main'
              }}
            />
            <span>Email</span>
          </div>
          <a href="/">jwashington@gmail.com</a>
        </div>
        <div className={classes.detail}>
          <div className={classes.label}>
            <span>Website</span>
          </div>
          <a href="/">justinewashington.com</a>
        </div>
        <div className={classes.detail}>
          <div className={classes.label}>
            <span>Behance</span>
          </div>
          <a href="/">behance.net/josephinewashington</a>
        </div>
      </div>
    </Card>
  );
}

export default ProfileDetails;
