import Link from 'next/link';
import classes from './Toobar.module.scss';

function Toolbar() {
  return (
    <div className={classes.toolbar}>
      <ul>
        <li>
          <Link href="https://www.avenueforthearts.co/about">
            <a>Contact Us</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Toolbar;
