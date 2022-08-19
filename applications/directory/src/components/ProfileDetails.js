import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import SvgIcon from '@mui/material/SvgIcon';
import { Link as MuiLink } from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LanguageIcon from '@mui/icons-material/Language';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import { ReactComponent as BehanceIcon } from '../../public/images/img-behance.svg';
//import  BehanceIcon from '../../public/images/img-behance.svg';
import Link from './Link';

const displayUrlReg = /http(s)?(:)?(\/\/)?|(\/\/)?(www\.)?/;

const socialIcons = {
  website: <LanguageIcon />,
  behance: <SvgIcon component={BehanceIcon} />,
  // behance: (
  //   <SvgIcon>
  //     {' '}
  //     <path
  //       d="M18.3331354,1.66664867 L12.499865,1.66664867 L12.499865,0 L18.3331354,0 L18.3331354,1.66664867 Z M19.7714532,9.99989201 C19.4031238,11.0807137 18.0806381,12.499865 15.5206657,12.499865 C12.9590267,12.499865 10.8840491,11.0590472 10.8840491,7.77074942 C10.8840491,4.51245127 12.8215282,2.83746936 15.4389999,2.83746936 C18.0073055,2.83746936 19.5756219,4.32245332 19.9181182,6.52576286 C19.9831175,6.94742497 20.0089506,7.51575217 19.997284,8.30907694 L13.3081896,8.30907694 C13.4165218,10.9848814 16.2106583,11.0690471 17.1314817,9.99989201 L19.7714532,9.99989201 Z M13.3665223,6.66659467 L17.5039776,6.66659467 C17.4164786,5.37744193 16.5573212,4.81744798 15.4398333,4.81744798 C14.2181798,4.81744798 13.5423538,5.45744106 13.3665223,6.66659467 Z M5.38827515,12.4898651 L-7.4014069e-16,12.4898651 L-7.4014069e-16,0.017499811 L5.7941041,0.017499811 C10.3573881,0.0849990821 10.4440539,4.55411749 8.06074628,5.77243766 C10.9448818,6.82242632 11.0415474,12.4898651 5.38827515,12.4898651 Z M2.499973,4.99994601 L5.48660742,4.99994601 C7.57658485,4.99994601 7.90824793,2.499973 5.22661022,2.499973 L2.499973,2.499973 L2.499973,4.99994601 Z M5.32577582,7.49991901 L2.499973,7.49991901 L2.499973,10.0132252 L5.2841096,10.0132252 C7.82991544,10.0132252 7.67408379,7.49991901 5.32577582,7.49991901 L5.32577582,7.49991901 Z"
  //       id="Shape"
  //     ></path>
  //   </SvgIcon>
  // ),
  other: <AltRouteIcon />,
};
const ProfileDetails = ({ artist }) => {
  const { firstName, lastName, email, social, memberSince } = artist;
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
          <MuiLink
            sx={{
              fontStyle: 'normal',
              // fontWeight: 'bold', // does not work without important!
              letterSpacing: 1.25,
              color: 'primary.main',
            }}
            href={`mailto:${email}`}
          >
            {email}
          </MuiLink>
        </Box>

        {social.length > 0 &&
          social.map(({ name, url }, index) => (
            <Box key={index} sx={{ mb: '10px' }}>
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
                      fontSize: 20,
                      fontWeight: 'bold',
                      marginRight: '5px',
                      color: 'primary.main',
                    },
                  },
                }}
              >
                <span>{socialIcons[name]}</span>
                <span>{name}</span>
              </Box>
              <Link href={url}>{url.replace(displayUrlReg, '')}</Link>
            </Box>
          ))}
      </Box>
    </Card>
  );
};

export default ProfileDetails;
