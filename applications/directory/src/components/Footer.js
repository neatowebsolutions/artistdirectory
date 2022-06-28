import Link from 'next/link';

import Typography from '@mui/material/typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Link as MuiLink } from '@mui/material';
import Divider from '@mui/material/Divider';

function Footer() {
  return (
    <footer>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw',
          //   height: '2.5rem',
          position: 'relative',
          left: 'calc(-50vw + 50%)',
          backgroundColor: 'rgba(190, 41, 38, 0.1)',
          '& div': {
            margin: ['.8rem']
          }
        }}
      >
        <Box>
          <Typography
            variant="p"
            sx={{
              fontSize: ['0.875rem', '0.875rem', '0.875rem', '0.875rem']
            }}
          >
            © Copyright 2021 Avenue for the Arts
            <MuiLink
              href="https://www.avenueforthearts.co/about" // TODO  - correct path
              sx={{
                textDecoration: 'none',
                color: 'primary.main',
                fontWeight: '600',
                letterSpacing: '1.25px'
              }}
            >
              Contact Us
            </MuiLink>
          </Typography>
        </Box>

        {/* <Box sx={{ marginRight: '0' }}>
          <ul>
            <li>
              <Link href="https://www.avenueforthearts.co/about">
                <a>Contact Us</a>
              </Link>
            </li>
          </ul>
        </Box> */}
      </Box>
    </footer>
  );
}

export default Footer;
