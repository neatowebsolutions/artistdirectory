import { useState, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Fade from '@mui/material/Fade';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import SendIcon from '@mui/icons-material/Send';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Button } from '@mui/material';
import router from 'next/router';

const inputFieldStyles = {
  style: {
    fontSize: '1rem'
  }
};

const ProfileReview = ({ onSubmit }) => {
  const [submissionError, setSubmissionError] = useState('');
  const alertElement = useRef();
  // formik
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    handleReset,
    resetForm,
    dirty,
    values,
    isSubmitting,
    isValid,
    errors,
    touched
  } = useFormik({
    initialValues: {
      rejectionReason: '',
      approvalStatus: 'approved'
    },
    enableReinitialize: true, // lets the form to go back to initial values if reset form
    validationSchema: Yup.object().shape({
      approvalStatus: Yup.string(),
      rejectionReason: Yup.string().when('approvalStatus', {
        is: (val) => val === 'rejected',
        then: Yup.string()
          .test(
            'len',
            'Must be at least 50 characters and not longer than 1500 characters', // what is the min length?
            (val) => val && val.length > 50 && val.length <= 1500
          )
          .required('Description is required')
      })
    }),
    onSubmit: async (vals) => {
      try {
        await onSubmit(vals);
        router.push('/reviews/review-complete');
        resetForm();
        setSubmissionError('');
      } catch (error) {
        setSubmissionError(
          'An unexpected error occurred. Please try again to submit your review shortly.'
        );

        alertElement.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }
  });

  return (
    <Box sx={{ marginBottom: '3.125rem' }}>
      {submissionError && (
        <Alert
          ref={alertElement}
          severity="error"
          sx={{
            fontSize: '1.2rem',
            marginBottom: '2rem'
          }}
          elevation={4}
        >
          {submissionError}
        </Alert>
      )}
      <Card
        elevation={2}
        sx={{
          width: ['auto', '80%'],
          margin: '0 auto',
          boxShadow: '-0.625rem 0.625rem 1.25rem 0 rgba(30, 30, 30, 0.05)' // the same shadow as in a few other places
        }}
      >
        <form noValidate onSubmit={handleSubmit}>
          <Box sx={{ marginBottom: '0.875rem' }}>
            <Typography
              variant="h2"
              sx={{
                // these h2 styles are the same for 4 more headers (2 in this component and 2 in 2 other components)
                fontSize: '1.25rem',
                fontFamily: 'gira-sans, sans-serif',
                fontWeight: 500,
                marginBottom: '0.875rem',
                textAlign: 'center'
              }}
            >
              Choose what do you want to do with the artist profile:
            </Typography>

            <Box
              sx={{
                marginBottom: '0.875rem' // this margin is all over the place on the review page (at least 5 different places)
              }}
            >
              <RadioGroup
                row
                aria-label="Approval status"
                name="row-radio-buttons-group"
                value={values.approvalStatus}
                sx={{
                  display: 'flex',
                  width: '80%',
                  margin: '0 auto',
                  '& label': {
                    flex: 1
                  }
                }}
              >
                <FormControlLabel
                  value="approved"
                  control={<Radio />}
                  label={<span style={{ fontSize: '1rem' }}>{'Approve!'}</span>}
                  name="approvalStatus"
                  onChange={handleChange}
                />
                <FormControlLabel
                  value="rejected"
                  control={<Radio />}
                  label={<span style={{ fontSize: '1rem' }}>{'Reject!'}</span>}
                  onChange={handleChange}
                  name="approvalStatus"
                />
              </RadioGroup>
            </Box>
            {/* <Divider light /> */}
          </Box>

          {values.approvalStatus === 'rejected' && (
            <Fade in={values.approvalStatus === 'rejected'}>
              <Box
                sx={{
                  '& p': {
                    // styling error message
                    typography: 'body1',
                    fontSize: ['0.75rem', '0.75rem', '0.75rem', '0.75rem'],
                    fontStyle: 'italic',
                    lineHeight: '1.33',
                    letterSpacing: '0.4px',
                    marginTop: '0',
                    marginBottom: '1rem'
                  }
                }}
              >
                <Typography
                  variant="h3"
                  component="h3"
                  sx={{
                    fontFamily: 'gira-sans, sans-serif',
                    fontSize: ['1.25rem'],
                    fontWeight: '500',
                    marginBottom: '1.5rem',
                    marginTop: '2rem',
                    textAlign: 'center'
                  }}
                >
                  State your reasons for rejection.
                  <Box component="span">*</Box>
                  <Box
                    component="span"
                    sx={{
                      color: 'primary.text',
                      opacity: '0.75',
                      fontSize: ['0.875rem'],
                      fontWeight: '500',
                      fontStyle: 'italic',
                      lineHeight: '1.33',
                      letterSpacing: '1px',
                      marginLeft: '0.938rem'
                    }}
                  >
                    1500 CHARACTERS MAX!
                  </Box>
                </Typography>

                <FormControl fullWidth>
                  <TextField
                    id="outlined-textarea"
                    label="Reasons for profile rejection."
                    minRows={6}
                    inputProps={{ ...inputFieldStyles, maxLength: 1500 }}
                    InputLabelProps={inputFieldStyles}
                    multiline
                    onBlur={handleBlur}
                    value={values.rejectionReason}
                    name="rejectionReason"
                    onChange={handleChange}
                    error={errors.rejectionReason && touched.rejectionReason}
                    helperText={
                      touched.rejectionReason ? errors.rejectionReason : ''
                    }
                  />
                </FormControl>
              </Box>
            </Fade>
          )}
          <Box
            sx={{
              maxWidth: '48.875rem',
              margin: '2rem auto 0 auto',
              display: 'flex',
              flexDirection: ['column', 'row'],
              alignItems: 'center',
              justifyContent: ['center', 'space-between', 'space-around'],
              '& button': {
                width: ['19.438rem', '11.063rem'],
                marginBottom: '0.813rem'
              }
            }}
          >
            <Button
              type="submit"
              disabled={!isValid || !dirty || isSubmitting} // TODO - delete !isDirty because it disables the button for approve cases
              variant="contained"
              startIcon={<SendIcon />}
            >
              Submit Form
            </Button>
            <Button
              type="reset"
              variant="outlined"
              startIcon={<DeleteOutlineIcon />}
              onClick={handleReset}
            >
              Clear Form
            </Button>
          </Box>
        </form>
      </Card>
    </Box>
  );
};

export default ProfileReview;
