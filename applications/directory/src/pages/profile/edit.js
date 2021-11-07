import Button from '@mui/material/Button';
import Head from 'next/head';
import CreateProfileForm from '../../components/CreateProfileForm';
import ProfileDetails from '../../components/ProfileDetails';
import LoginInfo from '../../components/LoginInfo';
import Upload from '../../components/Upload';
import { Layout } from '../../components';
import classes from './edit.module.scss';

const AccountEditPage = () => (
  <>
    <Head>
      <title>My Profile</title>
    </Head>
    <Layout>
      <div className={classes.root}>
        <div className={classes.profileTitle}>
          <h1>My Profile</h1>
          <nav>
            <ul>
              <li>
                <Button variant="text">Cancel Changes</Button>
              </li>
              <li>
                <Button variant="contained" disableElevation>
                  Save Changes
                </Button>
              </li>
            </ul>
          </nav>
        </div>

        <div className={classes.account}>
          <ProfileDetails />
          <div className={classes.personalDetails}>
            <nav>
              <ul>
                <li>
                  <a href="/" className={classes.active}>
                    Profile Details
                  </a>
                </li>
                <li>
                  <a href="/">Work</a>
                </li>
                <li>
                  <a href="/">Login Info</a>
                </li>
              </ul>
            </nav>

            <CreateProfileForm />
            {/* <Upload /> */}
            {/* <LoginInfo /> */}
          </div>
        </div>
      </div>
    </Layout>
  </>
);

export default AccountEditPage;
