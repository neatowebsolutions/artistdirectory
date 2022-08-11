import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import SvgIcon from '@mui/material/SvgIcon';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LanguageIcon from '@mui/icons-material/Language';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import Link from './Link';

const socialIcons = {
  website: <LanguageIcon />,
  behance: (
    <svg
      width="20"
      height="13"
      viewBox="0 0 20 13"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.333 2.167H12.5V.5h5.833v1.667zm1.438 8.333c-.368 1.08-1.69 2.5-4.25 2.5-2.562 0-4.637-1.441-4.637-4.73 0-3.258 1.938-4.933 4.555-4.933 2.568 0 4.137 1.485 4.48 3.689.064.421.09.99.078 1.783h-6.689c.109 2.676 2.903 2.76 3.823 1.69h2.64zm-6.404-3.333h4.137c-.088-1.29-.947-1.85-2.064-1.85-1.222 0-1.898.64-2.073 1.85zM5.388 12.99H0V.517h5.794c4.563.068 4.65 4.537 2.267 5.755 2.884 1.05 2.98 6.718-2.673 6.718zM2.5 5.5h2.987c2.09 0 2.421-2.5-.26-2.5H2.5v2.5zM5.326 8H2.5v2.513h2.784C7.83 10.513 7.674 8 5.326 8z"
        fill="#BE2926"
       
      />
    </svg>
  ),
  other: <AltRouteIcon />,
};
function ProfileDetails({
  artist: { firstName, lastName, email, social, memberSince },
}) {
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
            objectFit: 'cover',
          },
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
            color: 'rgba(0, 0, 0, 0.5)',
          },
          '& h3': {
            fontSize: '22px',
            fontWeight: 'bold',
            margin: '10px 0 5px 0',
          },
        }}
      >
        <h3>
          {firstName} {lastName}
        </h3>
        <h4>Member Since {memberSince}</h4>
        {/* TODO - how to hide the edit button for review */}
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
            margin: '10px 0 5px 0',
          },
          '& a': {
            margin: '0',
            fontSize: '16px',
            fontWeight: 'normal',
            lineHeight: '1.5',
            letterSpacing: '0.15px',
            color: 'primary.text',
            textDecoration: 'none',
          },
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
                color: 'rgba(0, 0, 0, 0.5)',
              },
            }}
          >
            <MailOutlineIcon
              sx={{
                fontSize: 18,
                marginRight: '5px',
                color: 'primary.main',
              }}
            />
            <span>Email</span>
          </Box>
          <a href="/">jwashington@gmail.com</a>
        </Box>

        {social.length &&
          social.map(({ name, url }) => (
            <Box key={`${name}-${url}`} sx={{ mb: '10px' }}>
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
                    color: 'rgba(0, 0, 0, 0.5)',
                    '&:first-letter': {
                      textTransform: 'capitalize',
                    },
                    '& svg': {
                      fontSize: 18,
                      fontWeight: 'bold',
                      marginRight: '5px',
                      color: 'primary.main',
                    },
                  },
                }}
              >
              <span><SvgIcon component={}/></span>
                <span>{socialIcons[name]}</span>
                <span>{name}</span>
              </Box>
              <Link href={url}>TODO - what goes here</Link>
            </Box>
          ))}
      </Box>
    </Card>
  );
}

export default ProfileDetails;
