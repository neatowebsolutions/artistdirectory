import { useState, useEffect } from 'react';

import Alert from '@mui/material/Alert';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useEmailValidation, useAuth } from '../hooks';

const inputFieldStyles = {
  style: {
    fontSize: '1rem',
    textTransform: 'capitalize'
  }
};

const inputBoxStyles = {
  marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth: '20.31rem'
};

const CreateAccount = () => {
  const [ifValidEmail, setIfValidEmail] = useState('');
  const { ifEmailExists } = useEmailValidation();
  const { authError, onSubmit: onSubmitCredentials } = useAuth();

  // formik
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    values,
    isValid,
    isSubmitting,
    dirty,
    errors,
    touched
  } = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('Please provide a valid email address.')
        .required('Please enter your email address.')
        .test('email', ifValidEmail, () => ifValidEmail === ''),
      password: Yup.string()
        .required('Please provide password.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(
          // https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/,
          'Password must contain minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character.'
        ),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Please confirm password.')
    }),
    onSubmit: async ({ email, password }) => {
      onSubmitCredentials(email, password, true); // true stands for creating a profile (account)
    }
  });
  const handleEmailBlur = async (e) => {
    if (values.email) {
      const ifAccountExists = await ifEmailExists(values.email);
      // if email is valid (there is a profile with this email in DB) set error message to empty string or populate with proper error message
      if (ifAccountExists.error) {
        setIfValidEmail('Server error. Fail to verify email');
      } else if (!ifAccountExists.profile) {
        setIfValidEmail('No Profile found associated with provided email');
      } else if (ifAccountExists.account) {
        setIfValidEmail('Account with given email already exists');
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
          Create Account
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <Box
            sx={{
              marginBottom: '0.875rem',
              marginTop: '1.5rem',
              ...inputBoxStyles
            }}
          >
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
              required
              onChange={handleChange}
              onBlur={handleEmailBlur}
              value={values.email}
              error={errors.email && touched.email}
              helperText={touched.email ? errors.email : ''}
              sx={{ width: '100%' }}
            />
          </Box>
          <Box sx={{ marginBottom: '0.875rem', ...inputBoxStyles }}>
            <TextField
              required
              type="password"
              id="outlined-password-input"
              label="Password"
              name="password"
              autoComplete="current-password"
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <VisibilityOffIcon />
                  </InputAdornment>
                ),
                ...inputFieldStyles
              }}
              InputLabelProps={inputFieldStyles}
              onBlur={handleBlur}
              value={values.password}
              error={errors.password && touched.password}
              helperText={touched.password ? errors.password : ''}
              sx={{ width: '100%' }}
            />
          </Box>
          <Box sx={inputBoxStyles}>
            <TextField
              required
              id="outlined-password-input"
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <VisibilityOffIcon />
                  </InputAdornment>
                ),
                ...inputFieldStyles
              }}
              InputLabelProps={inputFieldStyles}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
              error={errors.confirmPassword && touched.confirmPassword}
              helperText={touched.confirmPassword ? errors.confirmPassword : ''}
              sx={{ width: '100%' }}
            />
          </Box>
          <Button
            sx={{
              marginTop: '1.5rem',
              marginBottom: '0.5rem',
              maxWidth: ['100%', '100%', '20.31rem']
            }}
            type="submit"
            disabled={!isValid || !dirty || isSubmitting}
            variant="contained"
            startIcon={<VerifiedIcon />}
            fullWidth
          >
            Create Account
          </Button>
        </form>
      </Card>
    </Box>
  );
};

export default CreateAccount;
