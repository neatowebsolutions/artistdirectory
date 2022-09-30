import Typography from '@mui/material/typography';
import Box from '@mui/material/Box';

const Footer = () => {
  return (
    <footer>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100vw',
          position: 'relative',
          left: 'calc(-50vw + 50%)',
          backgroundColor: 'primary.light'
        }}
      >
        <Box sx={{ margin: ['.8rem'] }}>
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
      </Box>
    </footer>
  );
};

export default Footer;
