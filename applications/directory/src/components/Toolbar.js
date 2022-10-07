import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Link from './Link';

const Toolbar = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      <List sx={{ margin: 0, padding: 0 }}>
        <ListItem
          sx={{
            margin: '0.625rem 0',
            width: 'auto',
            padding: ['0.5rem 1rem', '0.5rem 1.5rem']
          }}
        >
          <Link
            href="https://www.avenueforthearts.co/about"
            sx={{
              fontSize: '0.75rem',
              lineHeight: 1.33,
              letterSpacing: '1.25px',
              textTransform: 'uppercase',
              textDecoration: 'none',
              color: 'primary.main',
              fontWeight: 'bold'
            }}
          >
            Contact Us
          </Link>
        </ListItem>
      </List>
    </Box>
  );
};

export default Toolbar;
