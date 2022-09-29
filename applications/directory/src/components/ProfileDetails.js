import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import SvgIcon from '@mui/material/SvgIcon';
import { Link as MuiLink } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LanguageIcon from '@mui/icons-material/Language';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import BehanceIcon from '../icons/behance.svg';
import Link from './Link';

const displayUrlReg = /http(s)?(:)?(\/\/)?|(\/\/)?(www\.)?/;

const socialIcons = {
  website: <LanguageIcon />,
  behance: (
    <SvgIcon
      component={BehanceIcon}
      sx={{
        transform: 'translate(17%,15%)'
      }}
    />
  ),
  other: <AltRouteIcon />
};

const labelStyles = {
  fontSize: ['0.75rem', '0.75rem', '0.75rem', '0.75rem'],
  fontWeight: 500,
  lineHeight: '1.33',
  letterSpacing: '0.4px',
  color: 'text.secondary',
  textTransform: 'capitalize'
};

const linkStyles = {
  display: 'flex',
  justifyContent: ['center', 'flex-start'],
  fontSize: '1rem',
  lineHeight: '1.5',
  letterSpacing: '0.15px'
};

// TODO - hide the edit button for review (it should be taken care of when working on auth functionality ),  temporarily solution here
const ProfileDetails = ({ artist, isLoggedIn = false }) => {
  const {
    firstName,
    lastName,
    email,
    profileImageUrl,
    social,
    memberSince
  } = artist;

  return (
    <Card
      sx={{ boxShadow: '-0.625rem 0.625rem 1.25rem 0 rgba(30, 30, 30, 0.05)' }} // TODO - we use this box shadow for 4 boxes just on this page. I am not sure about other boxes all over the designs, have not checked them all but i do know there are other box shadows on different pages. why are they all not the same...
    >
      <Box
        sx={{
          width: '10rem',
          height: '10rem',
          margin: ['0rem auto'],
          borderRadius: '4px',
          '& img': {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            // atl styling
            fontSize: '0.875rem',
            margin: '0 1rem'
          }
        }}
      >
        <img src={profileImageUrl} alt="Profile" />
      </Box>
      <Box
        sx={{
          borderBottom: 'solid 1px rgba(0, 0, 0, 0.1)',
          marginBottom: '1.425rem',
          textAlign: 'center'
        }}
      >
        <Typography
          variant="h2"
          component="h2"
          sx={{
            textAlign: 'center',
            fontSize: ['1.375rem'],
            fontFamily: 'gira-sans, sans-serif', // TODO - this component and ProfileDetails, WorkExamples use this fontFamily while all headers in MUI and many other pages are 'brandon-grotesque, sans-serif' for headers,
            margin: '0.375rem'
          }}
        >
          {firstName} {lastName}
        </Typography>
        <Typography
          variant="h4"
          component="h3"
          sx={{
            fontFamily: 'gira-sans, sans-serif',
            fontWeight: 'bold',
            color: 'rgba(0, 0, 0, 0.5)',
            marginBottom: '1.39rem'
          }}
        >
          Member Since {memberSince}
        </Typography>

        {isLoggedIn && (
          <Button
            sx={{ textAlign: 'center', marginBottom: '0.625rem' }}
            variant="text"
            startIcon={<EditIcon />}
            disableElevation
          >
            Edit Profile Picture
          </Button>
        )}
      </Box>
      <Box>
        <Typography
          variant="h3"
          component="h3"
          sx={{
            fontFamily: 'gira-sans, sans-serif',
            fontSize: ['1.25rem'],
            fontWeight: 'bold',
            marginBottom: '1rem',
            textAlign: ['center', 'left']
          }}
        >
          Contact Details
        </Typography>
        <Box sx={{ marginBottom: '1.25rem' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: ['center', 'flex-start'],
              alignItems: 'center'
            }}
          >
            <MailOutlineIcon
              sx={{
                marginRight: '5px',
                color: 'primary.main'
              }}
            />
            <Box component="span" typography="body1" sx={labelStyles}>
              Email
            </Box>
          </Box>
          <MuiLink
            sx={{
              ...linkStyles,
              textDecoration: 'none',
              color: 'text.secondary'
            }}
            href={`mailto:${email}`}
          >
            {email}
          </MuiLink>
        </Box>

        {social.length > 0 &&
          social.map(({ name, url }, index) => (
            <Box key={index} sx={{ marginTop: '1.25rem' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: ['center', 'flex-start']
                }}
              >
                <Box
                  component="span"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    '& svg': {
                      fontSize: 24,
                      fontWeight: 'bold',
                      marginRight: '5px',
                      color: 'primary.main',
                      margin: '0.125rem 0.5rem 0.125rem 0'
                    }
                  }}
                >
                  {socialIcons[name]}
                </Box>

                <Box component="span" sx={labelStyles}>
                  {name}
                </Box>
              </Box>
              <Box>
                <Link
                  href={url}
                  sx={{
                    ...linkStyles,
                    fontWeight: 500
                  }}
                >
                  {url.replace(displayUrlReg, '')}{' '}
                </Link>
              </Box>
            </Box>
          ))}
      </Box>
    </Card>
  );
};

export default ProfileDetails;
