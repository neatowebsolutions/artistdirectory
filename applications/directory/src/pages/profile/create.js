import Head from 'next/head';
import { Layout } from '../../components';
import CreateProfileForm from '../../components/CreateProfileForm';
import classes from './create.module.scss';

const CreatePage = () => (
  <>
    <Head>
      <title>Create Profile</title>
    </Head>
    <Layout>
      <Layout.Intro>
        <div className={classes.tagline}>Create your artist profile</div>
        <div className={classes.heading}>Local Artist Network</div>

        <p className={classes.introText1}>
          By submitting this form, you agree to have the following listed in the
          LAN: name, profession, website, Instagram, a thumbnail image of work,
          and a short description of your talents and services.
        </p>
        <p className={classes.introText2}>
          We&apos;re building a directory of the artists (art, design, music,
          performance) in the greater Grand Rapids area, so that people can
          discover their work all in once place. Whether you&apos;re looking to
          sell work, get hired for a project, or collaborate with another
          artist, the Local Artist Network can help you reach your goal.
        </p>
        <p>
          <span className={classes.removeNotice}>
            You may remove yourself from this listing at any time by emailing
          </span>
          <br />
          <a
            className={classes.emailLink}
            href="mailto:avenueforthearts@gmail.com"
          >
            avenueforthearts@gmail.com
          </a>
        </p>
      </Layout.Intro>
      <CreateProfileForm className={classes.form} />
    </Layout>
  </>
);

export default CreatePage;
