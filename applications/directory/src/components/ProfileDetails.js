import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

function ProfileDetails() {
  return (
    <Card>
      <Box
        sx={{
          width: '150px',
          height: '150px',
          margin: '0 auto',
          borderRadius: '4px',
          overflow: 'hidden',
          '& img': {
            height: '100%',
            width: '100%',
            objectFit: 'cover'
          }
        }}
      >
        <img src="/images/placeholder.png" alt="Placeholder" />
      </Box>
      <Box
        sx={{
          borderBottom: 'solid 1px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
          '& h4': {
            fontSize: '16px',
            fontWeight: 'bold',
            margin: '0 0 10px 0',
            color: 'rgba(0, 0, 0, 0.5)'
          },
          '& h3': {
            fontSize: '22px',
            fontWeight: 'bold',
            margin: '10px 0 5px 0'
          }
        }}
      >
        <h3>Josephine Washington</h3>
        <h4>Member Since 2021</h4>
        <Button
          sx={{ textAlign: 'center', mb: '10px' }}
          variant="text"
          startIcon={<EditIcon />}
          disableElevation
        >
          Edit Profile Picture
        </Button>
      </Box>
      <Box
        sx={{
          '& h3': {
            fontSize: '22px',
            fontWeight: 'bold',
            margin: '10px 0 5px 0'
          },
          '& a': {
            margin: '0',
            fontSize: '16px',
            fontWeight: 'normal',
            lineHeight: '1.5',
            letterSpacing: '0.15px',
            color: 'primary.text',
            textDecoration: 'none'
          }
        }}
      >
        <h3>Contact Details</h3>
        <Box sx={{ mb: '10px' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              '& span': {
                fontSize: '12px',
                fontWeight: '500',
                fontStretch: 'normal',
                fontStyle: 'normal',
                lineHeight: '1.33',
                letterSpacing: '0.4px',
                mt: '1px',
                color: 'rgba(0, 0, 0, 0.5)'
              }
            }}
          >
            <MailOutlineIcon
              sx={{
                fontSize: 18,
                marginRight: '5px',
                color: 'primary.main'
              }}
            />
            <span>Email</span>
          </Box>
          <a href="/">jwashington@gmail.com</a>
        </Box>
        <Box sx={{ mb: '10px' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              '& span': {
                fontSize: '12px',
                fontWeight: '500',
                fontStretch: 'normal',
                fontStyle: 'normal',
                lineHeight: '1.33',
                letterSpacing: '0.4px',
                mt: '1px',
                color: 'rgba(0, 0, 0, 0.5)'
              }
            }}
          >
            <span>Website</span>
          </Box>
          <a href="/">justinewashington.com</a>
        </Box>
        <Box sx={{ mb: '10px' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              '& span': {
                fontSize: '12px',
                fontWeight: '500',
                fontStretch: 'normal',
                fontStyle: 'normal',
                lineHeight: '1.33',
                letterSpacing: '0.4px',
                mt: '1px',
                color: 'rgba(0, 0, 0, 0.5)'
              }
            }}
          >
            <span>Behance</span>
          </Box>
          <a href="/">behance.net/josephinewashington</a>
        </Box>
      </Box>
    </Card>
  );
}

export default ProfileDetails;
