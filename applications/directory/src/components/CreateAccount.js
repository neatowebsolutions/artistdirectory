import { useState } from 'react';
import { useRouter } from 'next/router';
import Alert from '@mui/material/Alert';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { signIn } from 'next-auth/react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Button from '@mui/material/Button';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useEmailValidation } from '../hooks';

const CreateAccount = () => {
  const router = useRouter();
  const [ifValidEmail, setIfValidEmail] = useState('');
  const { ifEmailExists } = useEmailValidation();
  const [authError, setAuthError] = useState();

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
      const res = await signIn('credentials', {
        email,
        password,
        callbackUrl: `${window.location.origin}`,
        redirect: false
      });
      if (res.url) router.push('/');
      if (res.error) setAuthError('An Error occurred. Try again');
    }
  });

  return (
    <Card
      sx={{
        flex: 1,
        textAlign: 'center',
        border: '2px solid',
        borderColor: 'secondary.secondary',
        '& p.create': {
          color: 'secondary.secondary',
          fontSize: '1.875rem',
          fontWeight: '500',
          mt: 0
        },
        '& form': {
          '& legend.formTitle': {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            lineHeight: '1',
            letterSpacing: '0.18px'
          },
          '& p': {
            typography: 'body2',
            fontSize: '1.25rem',
            lineHeight: '1.2',
            letterSpacing: '0.15px',
            margin: '1rem 0',
            '& span': {
              color: 'primary.main'
            }
          }
        }
      }}
      elevation={6}
    >
      <p className="create">
        Create an account to manage your work and update your profile in the
        future.
      </p>
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

      <form noValidate onSubmit={handleSubmit}>
        <legend className="formTitle">Create an Account</legend>
        <p>
          <span>*</span>Required
        </p>
        <Box sx={{ mb: 2, mt: 3 }}>
          <TextField
            id="outlined-required"
            label="Email Address"
            name="email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutlineIcon />
                </InputAdornment>
              )
            }}
            sx={{ minWidth: ['100%', '100%', '325px'] }}
            required
            onChange={handleChange}
            onBlur={async (e) => {
              if (values.email) {
                const ifAccountExists = await ifEmailExists(values.email);
                // if email is valid (there is a profile with this email in DB) set error message to empty string or populate with proper error message
                if (ifAccountExists.error) {
                  setIfValidEmail('Server error. Fail to verify email');
                } else if (!ifAccountExists.profile) {
                  setIfValidEmail(
                    'No Profile found associated with provided email'
                  );
                } else if (ifAccountExists.account) {
                  setIfValidEmail('Account with given email already exists');
                } else {
                  setIfValidEmail('');
                }
              }
              handleBlur(e);
            }}
            value={values.email}
            error={errors.email && touched.email}
            helperText={touched.email ? errors.email : ''}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            required
            type="password"
            id="outlined-password-input"
            label="Password"
            name="password"
            autoComplete="current-password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            error={errors.password && touched.password}
            helperText={touched.password ? errors.password : ''}
            sx={{ minWidth: ['100%', '100%', '325px'] }}
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
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.confirmPassword}
            error={errors.confirmPassword && touched.confirmPassword}
            helperText={touched.confirmPassword ? errors.confirmPassword : ''}
            sx={{ minWidth: ['100%', '100%', '325px'] }}
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
  );
};

export default CreateAccount;
