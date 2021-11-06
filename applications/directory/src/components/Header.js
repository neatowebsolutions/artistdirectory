import Button from '@mui/material/Button';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import classes from './Header.module.scss';

function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.siteBranding}>
        <img src="/images/img-logo.svg" alt="Avenue For The Arts" />
      </div>
      <nav>
        <ul>
          <li>
            <a href="/" className={classes.active}>
              Home
            </a>
          </li>
          <li>
            <a href="/city-directory">City Directory</a>
          </li>
          <li>
            <Button
              variant="contained"
              startIcon={<ControlPointIcon />}
              disableElevation
            >
              Create Your Artist Profile
            </Button>
          </li>
          <li className={classes.profile}>
            <a href="/">
              {' '}
              <img src="/images/placeholder.png" alt="placeholder" />
              Josephine Washington
              <ArrowDropDownIcon />
            </a>
            <ul className={classes.profileSubmenu}>
              <li>
                <a href="/my-account">My Account</a>
              </li>
              <li>
                <a href="/log-out">Log Out</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
