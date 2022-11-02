// TODO - needs styling
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Button from '@mui/material/Button';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useEmailValidation, useAuth } from '../hooks';

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
        <legend className="formTitle">Log In</legend>
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
            onBlur={handleEmailBlur}
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

        <Button
          sx={{ mt: 3, mb: 1, maxWidth: ['100%', '100%', '325px'] }}
          type="submit"
          disabled={!isValid || !dirty || isSubmitting}
          variant="contained"
          startIcon={<VerifiedIcon />}
          fullWidth
        >
          Log In
        </Button>
      </form>
    </Card>
  );
};

export default LogIn;
