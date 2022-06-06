import Link from 'next/link';

import Typography from '@mui/material/typography';
import Box from '@mui/material/Box';

function Footer() {
  return (
    <footer>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw',
          height: '2.5rem',
          position: 'relative',
          left: 'calc(-50vw + 50%)',
          backgroundColor: 'rgba(190, 41, 38, 0.1)',
          // margin: '0 -50rem'
        }}
      >
        <Box>
          <Typography
            variant="p"
            sx={{
              fontSize: ['0.875rem', '0.875rem', '0.875rem', '0.875rem'],
            }}
          >
            © Copyright 2021 Avenue for the Arts
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
