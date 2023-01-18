// TODO - needs styling
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Button from '@mui/material/Button';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useEmailValidation, useAuth } from '../hooks';

const inputFieldStyles = {
  style: {
    fontSize: '1rem',
    '& :firstLetter': {
      textTransform: 'capitalize'
    }
  }
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
    enableReinitialize: true, // lets the form to go back to initial values if reset form
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('Please provide a valid email address.')
        .test('email', ifValidEmail, () => ifValidEmail === '')
        .required('Please enter your email address.'),
      password: Yup.string()
        .required('Please provide password.')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(
          // https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/,
          'Password must contain Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character.'
        ),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Please confirm password.')
    }),
    onSubmit: async ({ email, password }) => {
      onSubmitCredentials(email, password);
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
              onChange={handleChange}
              InputProps={inputFieldStyles}
              InputLabelProps={inputFieldStyles}
              onBlur={handleBlur}
              value={values.password}
              error={errors.password && touched.password}
              helperText={touched.password ? errors.password : ''}
              sx={{ minWidth: ['100%', '100%', '20.31rem'] }}
            />
          </Box>
          <Box>
            <TextField
              required
              id="outlined-password-input"
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              autoComplete="current-password"
              InputProps={{
                style: {
                  fontSize: '1rem',
                  '& :firstLetter': {
                    textTransform: 'capitalize'
                  }
                }
              }}
              InputLabelProps={{
                style: {
                  fontSize: '1rem'
                }
              }}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.confirmPassword}
              error={errors.confirmPassword && touched.confirmPassword}
              helperText={touched.confirmPassword ? errors.confirmPassword : ''}
              sx={{ minWidth: ['100%', '100%', '20.31rem'] }}
            />
          </Box>
          <Button
            sx={{ mt: 3, mb: 1, maxWidth: ['100%', '100%', '325px'] }}
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
