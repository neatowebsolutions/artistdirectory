import Head from 'next/head';
import Card from '@mui/material/Card';
import { Layout } from '../../components';
import CreateProfileForm from '../../components/CreateProfileForm';
import styles from './create.module.scss';

const CreatePage = () => (
  <>
    <Head>
      <title>Create Profile</title>
    </Head>
    <Layout>
      <Layout.Intro>
        <div className={styles.tagline}>Create your artist profile</div>
        <div className={styles.heading}>Local Artist Network</div>

        <p className={styles.introText1}>
          By submitting this form, you agree to have the following listed in the
          LAN: name, profession, website, Instagram, a thumbnail image of work,
          and a short description of your talents and services.
        </p>
        <p className={styles.introText2}>
          We&apos;re building a directory of the artists (art, design, music,
          performance) in the greater Grand Rapids area, so that people can
          discover their work all in once place. Whether you&apos;re looking to
          sell work, get hired for a project, or collaborate with another
          artist, the Local Artist Network can help you reach your goal.
        </p>
        <p>
          <span className={styles.removeNotice}>
            You may remove yourself from this listing at any time by emailing
          </span>
          <br />
          <a
            className={styles.emailLink}
            href="mailto:avenueforthearts@gmail.com"
          >
            avenueforthearts@gmail.com
          </a>
        </p>
      </Layout.Intro>
      <Card className={styles.formCard}>
        <CreateProfileForm />
      </Card>
    </Layout>
  </>
);

export default CreatePage;
