import classes from './Toobar.module.scss';

function Toolbar() {
  return (
    <div className={classes.toolbar}>
      <ul>
        <li>
          <a href="/contact-us">Contact Us</a>
        </li>
      </ul>
    </div>
  );
}

export default Toolbar;
