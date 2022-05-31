import Link from 'next/link';
import Button from '@mui/material/Button';
import Typography from '@mui/material/typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import ControlPointIcon from '@mui/icons-material/ControlPoint';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import classes from './Header.module.scss';

function Header() {
  return (
    <header className={classes.header}>
      <Box className={classes.siteBranding}>
        <Link href="/" className={classes.active}>
          <a>
            <img src="/images/img-logo.svg" alt="Avenue For The Arts" />
          </a>
        </Link>
      </Box>
      <nav>
        <List>
          <ListItem sx={{ display: ['none', 'none', 'block'] }}>
            <Link href="/" className={classes.active}>
              <a>Home</a>
            </Link>
          </ListItem>
          <ListItem sx={{ display: ['none', 'none', 'block'] }}>
            <Link href="/artists">
              <a>Artist Directory</a>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/profile/create" passHref>
              <Button
                component="a"
                color="primary"
                variant="contained"
                startIcon={<ControlPointIcon />}
                sx={{
                  '&&': {
                    color: 'white',
                  },
                }}
              >
                Create Your Artist Profile
              </Button>
            </Link>
          </ListItem>
          <ListItem className={classes.profile}>
            <Link href="/">
              <a>
                <img src="/images/placeholder.png" alt="placeholder" />
                Josephine Washington
                <ArrowDropDownIcon />
              </a>
            </Link>
            <List className={classes.profileSubmenu}>
              <ListItem>
                <Link href="/profile">
                  <a>My Account</a>
                </Link>
              </ListItem>
              <ListItem>
                <Link href="/logout">
                  <a>Log Out</a>
                </Link>
              </ListItem>
            </List>
          </ListItem>
        </List>
      </nav>
    </header>
  );
}

export default Header;
