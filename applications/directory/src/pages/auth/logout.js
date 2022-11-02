import { signOut } from 'next-auth/react';
import Head from 'next/head';
import Box from '@mui/material/Box';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Layout } from '../../components';

const LogOut = () => {
  // formik

  return (
    <>
      <Head>
        <title>Log Out</title>
      </Head>
      <Layout>
        <Layout.Root>
          <Card>
            <Button
              type="submit"
              variant="contained"
              onClick={() => signOut()}
              sx={{}}
            >
              LogOut
            </Button>
          </Card>
        </Layout.Root>
      </Layout>
    </>
  );
};

export default LogOut;
