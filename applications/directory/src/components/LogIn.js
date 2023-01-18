// TODO - needs styling
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ResetTvIcon from '@mui/icons-material/ResetTv';
// import LockResetIcon from '@mui/icons-material/LockReset'; ===> ERROR - Module not found: Can't resolve '@mui/icons-material/LockReset'
import Button from '@mui/material/Button';
import VerifiedIcon from '@mui/icons-material/Verified';
import Link from './Link';
import { useEmailValidation, useAuth } from '../hooks';

const inputFieldStyles = {
  style: {
    fontSize: '1rem',
    '& :firstLetter': {
      textTransform: 'capitalize'
    }
  }
};

const LogIn = () => {
  const [ifValidEmail, setIfValidEmail] = useState('');
  const { ifEmailExists } = useEmailValidation();
  const { authError, onSubmit: onSubmitCredentials } = useAuth();
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
    // enableReinitialize: true, // lets the form to go back to initial values if reset form
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('Please provide a valid email address.')
        .test('email', ifValidEmail, () => ifValidEmail === '')
        .required('Please enter your email address.')
    }),
    onSubmit: async ({ email, password }) =>
      onSubmitCredentials(email, password)
  });

  const handleEmailBlur = async (e) => {
    if (values.email) {
      const ifAccountExists = await ifEmailExists(values.email);
      // if email is valid (there is a profile with this email in DB) set error message to empty string or populate with proper error message
      if (ifAccountExists.error) {
        setIfValidEmail('Server error. Fail to verify email');
      } else if (!ifAccountExists.profile) {
        setIfValidEmail('No Profile found associated with provided email');
      } else {
        setIfValidEmail('');
      }
    }
    handleBlur(e);
  };

  return (
    <Box
      sx={{
        marginTop: ['1.5rem', '2.5rem', '2.6rem', '4.188rem'],
        marginBottom: ['1.5rem', '2.5rem', '2.6rem', '4.188rem']
      }}
    >
      <Card
        sx={{
          textAlign: 'center',
          width: ['100%', '80%', '70%'],
          margin: '0 auto'
        }}
        elevation={6}
      >
        {authError && (
          <Alert
            severity="error"
            sx={{
              fontSize: '1.2rem',
              marginBottom: '2rem'
            }}
            elevation={4}
          >
            {authError}
          </Alert>
        )}

        <Box
          component="img"
          src="/images/img-knockknock.svg"
          alt="Knockknock"
          sx={{
            width: ['4rem', '5rem', '9rem'],
            marginTop: ['1rem', '1.5rem', '2.6rem'],
            marginBottom: ['1rem', '1.3rem']
          }}
        />
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontWeight: '900',
            fontSize: ['1.5rem', '2rem', '2.5rem'],
            color: 'primary.main',
            textTransform: 'uppercase',
            letterSpacing: [2, 3],
            marginBottom: ['1.063rem', '1.625rem', '1.5rem']
          }}
        >
          Login
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <Box sx={{ marginBottom: '0.875rem', marginTop: 3 }}>
            <TextField
              id="outlined-required"
              label="Email Address"
              name="email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineIcon />
                  </InputAdornment>
                ),
                ...inputFieldStyles
              }}
              InputLabelProps={inputFieldStyles}
              sx={{ minWidth: ['100%', '100%', '20.31rem'] }}
              required
              onChange={handleChange}
              onBlur={handleEmailBlur}
              value={values.email}
              error={errors.email && touched.email}
              helperText={touched.email ? errors.email : ''}
            />
          </Box>
          <Box sx={{ marginBottom: '0.875rem' }}>
            <TextField
              required
              type="password"
              id="outlined-password-input"
              label="Password"
              name="password"
              autoComplete="current-password"
              InputProps={inputFieldStyles}
              InputLabelProps={inputFieldStyles}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              error={errors.password && touched.password}
              helperText={touched.password ? errors.password : ''}
              sx={{
                minWidth: ['100%', '100%', '20.31rem']
              }}
            />
          </Box>

          <Button
            sx={{
              marginTop: '0.875rem',
              marginBottom: '0.188rem',
              maxWidth: ['100%', '100%', '20.31rem'],
              height: '2.25rem!important'
            }}
            type="submit"
            disabled={!isValid || !dirty || isSubmitting}
            variant="contained"
            startIcon={<VerifiedIcon />}
            fullWidth
          >
            Log In
          </Button>
        </form>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '1rem'
          }}
        >
          {/* <Box
            component="img"
            src="/images/img-lock-reset-black.svg"
            alt="Lock"
            sx={{
              width: ['1.5rem', '2rem', '3rem'],
              marginTop: ['1rem', '1.5rem', '2.6rem'],
              marginBottom: ['1rem', '1.3rem']
            }}
          /> */}
          <ResetTvIcon sx={{ color: 'primary.main', marginRight: '0.5rem' }} />

          <Link
            href="/reset"
            sx={{
              color: 'primary.main',
              textTransform: 'uppercase',
              letterSpacing: [2, 3],
              fontWeight: 500,
              fontSize: '0.875rem',
              textDecoration: 'none',
              padding: '0.625rem 0'
            }}
          >
            Forgot password?
          </Link>
        </Box>
      </Card>
    </Box>
  );
};

export default LogIn;
