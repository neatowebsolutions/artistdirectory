import Link from 'next/link';
import Button from '@mui/material/Button';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import classes from './Header.module.scss';

function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.siteBranding}>
        <Link href="/" className={classes.active}>
          <a>
            <img src="/images/img-logo.svg" alt="Avenue For The Arts" />
          </a>
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/" className={classes.active}>
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/artists">
              <a>Artist Directory</a>
            </Link>
          </li>
          <li>
            <Link href="/profile/create" passHref>
              <Button
                component="a"
                color="primary"
                variant="contained"
                startIcon={<ControlPointIcon />}
                sx={{
                  '&&': {
                    color: 'white'
                  }
                }}
              >
                Create Your Artist Profile
              </Button>
            </Link>
          </li>
          <li className={classes.profile}>
            <Link href="/">
              <a>
                <img src="/images/placeholder.png" alt="placeholder" />
                Josephine Washington
                <ArrowDropDownIcon />
              </a>
            </Link>
            <ul className={classes.profileSubmenu}>
              <li>
                <Link href="/profile">
                  <a>My Account</a>
                </Link>
              </li>
              <li>
                <Link href="/logout">
                  <a>Log Out</a>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;