import classes from './Header.module.scss';

function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.siteBranding}>
        <img src="/images/img-logo.png" alt="Avenue For The Arts Logo" />
      </div>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/">City Directory</a>
          </li>
          <li>
            <button className="btn__primary">Create Your Artist Profile</button>
          </li>
          <li className={classes.profile}>
            <a href="/my-profile">
              <img src="/images/placeholder.png" alt="placeholder" />
              Josephine Washington
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
