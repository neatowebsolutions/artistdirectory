import Head from 'next/head';
import Box from '@mui/material/Box';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { signIn } from 'next-auth/react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Layout } from '../../components';

const LogIn = () => {
  // formik
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    setValues,
    setTouched,
    resetForm,
    values,
    isValid,
    isSubmitting,
    dirty,
    errors,
    touched
  } = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    enableReinitialize: true, // lets the form to go back to initial values if reset form
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('Please provide a valid email address.')
        // .test('email', ifValidEmail, () => ifValidEmail === '')
        .required('Please enter your email address.')
    }),
    onSubmit: async (vals) => {
      try {
     //   console.log(vals);
     //   console.log(`${window.location.origin}/`);
     //   console.log(`${process.env.DIRECTORY_APP_URL}/`);

        await signIn('credentials', {
          ...vals,
          callbackUrl: `${window.location.origin}`,
         //redirect: false
        });
      } catch (error) {
        console.log(error);
      }
    }
  });

  return (
    <>
      <Head>
        <title>Log In</title>
      </Head>
      <Layout>
        <Layout.Root>
          <form noValidate onSubmit={handleSubmit}>
            <Card
              sx={{
                padding: ['1.5rem 1rem', '1.5rem', '2rem'],
                '& label': {
                  marginLeft: ['0rem', '.5rem'],
                  fontSize: '1rem'
                },
                '& .MuiInputLabel-shrink': {
                  marginLeft: ['.1rem', '.4rem']
                },
                // error messages styling
                '& .MuiFormHelperText-root': {
                  typography: 'body1',
                  fontSize: ['0.75rem', '0.75rem', '0.75rem', '0.75rem'],
                  fontStyle: 'italic'
                }
              }}
              elevation={6}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  '& h1': {
                    fontSize: '2.2rem'
                  }
                }}
              >
                <h1>Log In</h1>
                {/* <h1>Artist Profile</h1> */}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: ['column', 'row'],
                  marginTop: '1.5rem'
                }}
              >
                <TextField
                  required
                  InputProps={{}}
                  InputLabelProps={{}}
                  id="outlined-required"
                  type="email"
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  error={errors.email && touched.email}
                  helperText={touched.email ? errors.email : ''}
                />
                <TextField
                  required
                  type="password"
                  sx={{
                    marginRight: '1.56rem'
                  }}
                  InputProps={{}}
                  InputLabelProps={{}}
                  id="outlined-required"
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  error={errors.password && touched.password}
                  helperText={touched.password ? errors.password : ''}
                />
              </Box>
              <Box
                sx={{
                  maxWidth: '48.875rem',
                  margin: '2rem auto 0 auto',
                  display: 'flex',
                  flexDirection: ['column', 'row'],
                  alignItems: 'center',
                  justifyContent: ['center', 'space-between']
                }}
              >
                <Button
                  type="submit"
                  disabled={!isValid || !dirty || isSubmitting}
                  variant="contained"
                  // startIcon={<SendIcon />}
                  sx={{}}
                >
                  Submit Form
                </Button>
              </Box>
            </Card>
          </form>
        </Layout.Root>
      </Layout>
    </>
  );
};

export default LogIn;
