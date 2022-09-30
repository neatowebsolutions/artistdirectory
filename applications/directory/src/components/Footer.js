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
          </Typography>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
