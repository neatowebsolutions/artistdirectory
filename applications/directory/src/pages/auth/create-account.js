import Head from 'next/head';
import Box from '@mui/material/Box';
import { Layout } from '../../components';
import CreateAccount from '../../components/CreateAccount';

const CreateAccountPage = () => (
  <>
    <Head>
      <title>Create Your Account</title>
    </Head>
    <Layout>
      <Layout.Intro>
        <Box
          sx={{
            display: 'flex',
            flexDirection: ['column', 'row'],
            alignItems: ['start']
          }}
        >
          <CreateAccount />
        </Box>
      </Layout.Intro>
    </Layout>
  </>
);

export default CreateAccountPage;

// import { useState } from 'react';
// import { useRouter } from 'next/router';
// import Alert from '@mui/material/Alert';
// import Head from 'next/head';
// import Box from '@mui/material/Box';
// import * as Yup from 'yup';
// import { useFormik } from 'formik';
// import { signIn } from 'next-auth/react';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import Typography from '@mui/material/Typography';
// import Card from '@mui/material/Card';
// import Button from '@mui/material/Button';
// import SendIcon from '@mui/icons-material/Send';
// import TextField from '@mui/material/TextField';
// import { Layout } from '../../components';
// import { useEmailValidation } from '../../hooks';
// //import CreateAccount from '../../components/CreateAccount';
// const CreateAccount = () => {
//   const router = useRouter();
//   const [ifValidEmail, setIfValidEmail] = useState('');
//   const { ifEmailExists } = useEmailValidation();
//   const [authError, setAuthError] = useState();
//   // formik
//   const {
//     handleBlur,
//     handleChange,
//     handleSubmit,
//     setFieldValue,
//     setValues,
//     setTouched,
//     resetForm,
//     values,
//     isValid,
//     isSubmitting,
//     dirty,
//     errors,
//     touched
//   } = useFormik({
//     initialValues: {
//       email: '',
//       password: '',
//       confirmPassword: ''
//     },
//     enableReinitialize: true, // lets the form to go back to initial values if reset form
//     validationSchema: Yup.object().shape({
//       email: Yup.string()
//         .email('Please provide a valid email address.')
//         .test('email', ifValidEmail, () => ifValidEmail === '')
//         .required('Please enter your email address.'),
//       password: Yup.string()
//         .required('Please provide password.')
//         .min(8, 'Password is too short - should be 8 chars minimum.')
//         .matches(
//           // https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
//           /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/,
//           'Password must contain Minimum eight and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character.'
//         ),
//       confirmPassword: Yup.string()
//         .oneOf([Yup.ref('password'), null], 'Passwords must match')
//         .required('Please confirm password.')
//     }),
//     onSubmit: async ({ email, password }) => {
//       const res = await signIn('credentials', {
//         email,
//         password,
//         callbackUrl: `${window.location.origin}`,
//         redirect: false
//       });
//       if (res.url) router.push('/');
//       if (res.error) setAuthError('An Error occurred. Try again');
//     }
//   });

//   return (
//     <>
//       <Head>
//         <title>Create Account</title>
//       </Head>
//       <Layout>
//         <Layout.Root>
//           {authError && (
//             <Alert
//               severity="error"
//               sx={{
//                 fontSize: '1.2rem',
//                 marginBottom: '2rem'
//               }}
//               elevation={4}
//             >
//               {authError}
//             </Alert>
//           )}
//           <form noValidate onSubmit={handleSubmit}>
//             <Card
//               sx={{
//                 padding: ['1.5rem 1rem', '1.5rem', '2rem'],
//                 '& label': {
//                   marginLeft: ['0rem', '.5rem'],
//                   fontSize: '1rem'
//                 },
//                 '& .MuiInputLabel-shrink': {
//                   marginLeft: ['.1rem', '.4rem']
//                 },
//                 // error messages styling
//                 '& .MuiFormHelperText-root': {
//                   typography: 'body1',
//                   fontSize: ['0.75rem', '0.75rem', '0.75rem', '0.75rem'],
//                   fontStyle: 'italic'
//                 }
//               }}
//               elevation={6}
//             >
//               <Box
//                 sx={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                   '& h1': {
//                     fontSize: '2.2rem'
//                   }
//                 }}
//               >
//                 <h1>Create Account</h1>
//               </Box>
//               <Box
//                 sx={{
//                   display: 'flex',
//                   flexDirection: ['column', 'row'],
//                   marginTop: '1.5rem'
//                 }}
//               >
//                 <TextField
//                   required
//                   InputProps={{}}
//                   InputLabelProps={{}}
//                   id="outlined-required"
//                   type="email"
//                   label="Email Address"
//                   name="email"
//                   onChange={handleChange}
//                   onBlur={async (e) => {
//                     if (values.email) {
//                       const ifAccountExists = await ifEmailExists(values.email);
//                       // if email is valid (there is a profile with this email in DB) set error message to empty string or populate with proper error message
//                       if (ifAccountExists.error) {
//                         setIfValidEmail('Server error. Fail to verify email');
//                       } else if (!ifAccountExists.profile) {
//                         setIfValidEmail(
//                           'No Profile found associated with provided email'
//                         );
//                       } else if (ifAccountExists.account) {
//                         setIfValidEmail(
//                           'Account with given email already exists'
//                         );
//                       } else {
//                         setIfValidEmail('');
//                       }
//                     }
//                     handleBlur(e);
//                   }}
//                   value={values.email}
//                   error={errors.email && touched.email}
//                   helperText={touched.email ? errors.email : ''}
//                 />
//                 <TextField
//                   required
//                   type="password"
//                   sx={{
//                     marginRight: '1.56rem'
//                   }}
//                   InputProps={{}}
//                   InputLabelProps={{}}
//                   id="outlined-required"
//                   label="Password"
//                   name="password"
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   value={values.password}
//                   error={errors.password && touched.password}
//                   helperText={touched.password ? errors.password : ''}
//                 />
//                 <TextField
//                   required
//                   type="password"
//                   sx={{
//                     marginRight: '1.56rem'
//                   }}
//                   InputProps={{}}
//                   InputLabelProps={{}}
//                   id="outlined-required"
//                   label="Confirm Password"
//                   name="confirmPassword"
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   value={values.confirmPassword}
//                   error={errors.confirmPassword && touched.confirmPassword}
//                   helperText={
//                     touched.confirmPassword ? errors.confirmPassword : ''
//                   }
//                 />
//               </Box>
//               <Box
//                 sx={{
//                   maxWidth: '48.875rem',
//                   margin: '2rem auto 0 auto',
//                   display: 'flex',
//                   flexDirection: ['column', 'row'],
//                   alignItems: 'center',
//                   justifyContent: ['center', 'space-between']
//                 }}
//               >
//                 <Button
//                   type="submit"
//                   disabled={!isValid || !dirty || isSubmitting}
//                   variant="contained"
//                   startIcon={<SendIcon />}
//                   sx={{}}
//                 >
//                   Create Account
//                 </Button>
//               </Box>
//             </Card>
//           </form>
//         </Layout.Root>
//       </Layout>
//     </>
//   );
// };

// export default CreateAccount;
