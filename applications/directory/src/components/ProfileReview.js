import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useHttpClient } from '@artistdirectory/react-hooks';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
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

const inputFieldStyles = {
  style: {
    fontSize: '1rem',
  },
};

function ProfileReview({ reviewToken }) {
  const { httpClient } = useHttpClient();

  // formik
  const {
    handleBlur,
    handleChange,
    handleSubmit,
    handleReset,
    setFieldValue,
    resetForm,
    values,
    isValid,
    dirty,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      reasons: '',
      approveStatus: 'approved',
    },
    enableReinitialize: true, // lets the form to go back to initial values if reset form
    validationSchema: Yup.object().shape({
      approveStatus: Yup.string(),
      reasons: Yup.string().when('approveStatus', {
        is: (val) => val === 'rejected',
        then: Yup.string()
          .test(
            'len',
            'Must be at least 50 characters and not longer than 1500 characters', // what is the min length?
            (val) => val && val.length > 50 && val.length <= 1500
          )
          .required('Description is required'),
      }),
    }),
    onSubmit: async (vals) => {
      console.log(vals);

      const artist = await httpClient.put(
        `/artists/token/${reviewToken}/update`,
        vals
      );
      console.log(artist);
      //resetForm(); // TODO - test reset form
    },
  });

  return (
    <Box>
      <Card elevation={2}>
        <form noValidate onSubmit={handleSubmit}>
          <Box sx={{ width: '75%' }}>
            <Typography variant="h3" component="h3">
              Choose what do you want to do with the artist profile:
            </Typography>
            <RadioGroup
              row
              aria-label="approve-status"
              name="row-radio-buttons-group"
              value={values.approveStatus}
            >
              <FormControlLabel
                value="approved"
                control={<Radio />}
                label={<span style={{ fontSize: '1rem' }}>{'Approve!'}</span>}
                name="approveStatus"
                onChange={handleChange}
              />
              <FormControlLabel
                value="rejected"
                control={<Radio />}
                label={<span style={{ fontSize: '1rem' }}>{'Reject!'}</span>}
                onChange={handleChange}
                name="approveStatus"
              />
            </RadioGroup>
          </Box>

          {values.approveStatus === 'rejected' && (
            <Fade in={values.approveStatus === 'rejected'}>
              <Box
                sx={{
                  '& p': {
                    typography: 'body1',
                    fontSize: ['0.75rem', '0.75rem', '0.75rem', '0.75rem'],
                    fontStyle: 'italic',
                    lineHeight: '1.33',
                    letterSpacing: '0.4px',
                    marginTop: '0',
                    marginBottom: '1rem',
                  },
                }}
              >
                <Typography
                  variant="h3"
                  component="h3"
                  sx={{
                    '& span:nth-of-type(2n)': {
                      color: 'primary.text',
                      opacity: '0.75',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      fontStyle: 'italic',
                      lineHeight: '1.33',
                      letterSpacing: '1px',
                      marginLeft: '0.938rem',
                    },
                  }}
                >
                  State your reasons for rejection.
                  <span>*</span>
                  <span>1500 CHARACTERS MAX!</span>
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
                    value={values.reasons}
                    name="reasons"
                    onChange={handleChange}
                    error={errors.reasons && touched.reasons} // ??
                    helperText={touched.reasons ? errors.reasons : ''} // ??
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
              justifyContent: ['center', 'space-between'],
              '& button': {
                width: ['19.438rem', '11.063rem'],
                marginBottom: '0.813rem',
              },
            }}
          >
            <Button
              type="submit"
              disabled={!isValid}
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
}

export default ProfileReview;
