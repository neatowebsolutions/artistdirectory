import Link from 'next/link';
import Box from '@mui/material/Box';

function Toolbar() {
  return (
    <Box
      sx={{
        '& ul': {
          display: 'flex',
          justifyContent: 'flex-end',
          margin: 0,
          padding: 0,
          listStyle: 'none',
          '& li': {
            margin: '10px',
            '& a': {
              textTransform: 'uppercase',
              textDecoration: 'none',
              color: 'primary.main'
            }
          }
        }
      }}
    >
      <ul>
        <li>
          <Link href="https://www.avenueforthearts.co/about">
            <a>Contact Us</a>
          </Link>
        </li>
      </ul>
    </Box>
  );
}

export default Toolbar;
