// TODO validation -  make sure at least one social link provided or delete the * for the social being required??
// TODO - need a fix: brief moment after the form is submitted the SUBMIT button becomes active again before 'thank-you' page opens
// TODO - change marginLeft for input social on mobile
// TODO reduce font size in prop-downs (n bigger screen)?

import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import PropTypes from 'prop-types'; // CreateProfileForm.propTypes = {className: PropTypes.string,} TODO - are we going to use classes at any point?
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import SendIcon from '@mui/icons-material/Send';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Upload from './Upload';
import { useEmailValidation, useCreateArtist } from '../hooks';

const categoriesDefaultValue = 'Dancer';
const tagsDefaultValue = 'Education';
const skillsDefaultValue = 'Carpentry';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  city: '',
  website: { checked: true, name: 'website', url: '' },
  behance: { checked: false, name: 'behance', url: '' },
  other: { checked: false, name: 'other', url: '' },
  description: '',
  categories: [categoriesDefaultValue],
  tags: [tagsDefaultValue],
  skills: [skillsDefaultValue],
  files: [],
  subscribedToNewsletter: 'yes'
};

const keywordsValidate = (keywords) =>
  keywords.every(
    (keyword) =>
      /^([a-zA-Z- ]+)?$/g.test(keyword) &&
      keyword.length < 30 &&
      keyword.length > 3
  );

const inputFieldStyles = {
  style: {
    fontSize: '1rem'
  }
};

// TODO - should it be a class across the whole app?
const starSpanStyles = {
  '& span': {
    color: 'primary.main'
  }
};

const labelStyles = {
  '& span': {
    fontSize: '1rem'
  }
};

const CreateProfileForm = ({
  categories = [categoriesDefaultValue],
  tags = [tagsDefaultValue],
  skills = [skillsDefaultValue]
}) => {
  const router = useRouter();
  const { createArtist } = useCreateArtist();
  const { ifEmailExists } = useEmailValidation();
  const [ifValidEmail, setIfValidEmail] = useState('');
  const [formReset, setFormReset] = useState(false);
  const [imageFiles, setFiles] = useState(initialValues.files);
  const [submitError, setSubmitError] = useState('');
  // get the element to scroll into view if displayed
  const alertElement = useRef();

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
    isSubmitting,
    dirty,
    errors,
    touched
  } = useFormik({
    initialValues,
    enableReinitialize: true, // lets the form to go back to initial values if reset form
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      city: Yup.string().required('City is required'),
      email: Yup.string()
        .email('Please provide a valid email address.')
        .test('email', ifValidEmail, () => ifValidEmail === '')
        .required('Please enter your email address.'),
      website: Yup.object({
        checked: Yup.boolean(),
        url: Yup.string().when('checked', {
          is: true,
          then: Yup.string()
            .matches(
              /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
              'Enter correct url!'
            )
            .required('Please enter website url')
        })
      }),
      behance: Yup.object({
        checked: Yup.boolean(),
        url: Yup.string().when('checked', {
          is: true,
          then: Yup.string()
            .matches(
              /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
              'Enter correct url!'
            )
            .required('Please enter behance url') // ?????? what is is? "behance url"??"
        })
      }),
      other: Yup.object({
        checked: Yup.boolean(),
        url: Yup.string().when('checked', {
          is: true,
          then: Yup.string()
            .matches(
              /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
              'Enter correct url!'
            )
            .required('Please enter website url')
        })
      }),
      description: Yup.string()
        .test(
          'len',
          'Must be at least 50 characters and not longer than 1500 characters', // what is the min length?
          (val) => val && val.length > 50 && val.length <= 1500
        )
        .required('Description is required'),
      categories: Yup.array()
        .test('categories', 'Enter valid artist type', (cts) =>
          keywordsValidate(cts)
        )
        .min(1, 'Please provide at least one artist type'),
      tags: Yup.array()
        .test('tags', 'Enter valid keyword', (tgs) => keywordsValidate(tgs))
        .min(1, 'Please choose at least one keyword'),
      skills: Yup.array()
        .test('skills', 'Enter valid keyword', (skls) => keywordsValidate(skls))
        .min(1, 'Please choose at least one keyword'),
      files: Yup.array()
        .min(1, 'Please provide at least 1 image')
        .test(
          'uploaded',
          'All images should be successfully uploaded',
          (files) => {
            const ifUploadError = files.every((file) => !file.uploadError);
            const ifFinishedLoading = files.every((file) => !file.loading);
            return ifUploadError && ifFinishedLoading;
          }
        )
    }),
    onSubmit: async (vals) => {
      const {
        firstName,
        lastName,
        email,
        city,
        website,
        behance,
        other,
        description,
        categories: allCategories,
        tags: allTags,
        skills: allSkills,
        files,
        subscribedToNewsletter
      } = vals;

      // user social links
      const social = [website, behance, other];

      const images = files.reduce((acc, { fileName }) => {
        acc.push(fileName);
        return acc;
      }, []);

      // convert 'yes'/'no' to boolean
      const subscribedToNewsletterParsed = subscribedToNewsletter === 'yes';

      const data = {
        firstName,
        lastName,
        email,
        city,
        social,
        description,
        categories: allCategories,
        tags: allTags,
        skills: allSkills,
        images,
        subscribedToNewsletter: subscribedToNewsletterParsed
      };
      try {
        await createArtist(data);
        resetForm(); // TODO - test reset form
        setFiles([]); // delete files
        setSubmitError('');

        // redirect to a thank-you page if the artist created successfully
        router.push({
          pathname: `/profile/thank-you/`,
          query: { name: firstName }
        });
      } catch (error) {
        setSubmitError(
          'An unexpected error occurred. Please try again to submit your form shortly.'
        );
        alertElement.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }
  });

  const handleChangeSocial = (e) => {
    const { value, name, type, checked } = e.target;
    const checkboxValName = `${name}.checked`;

    if (type === 'checkbox') {
      if (!checked) {
        setFieldValue([value], { checked, name: value, url: '' }); // clear respective input field if not checked
      } else {
        setFieldValue(checkboxValName, checked);
      }
    } else {
      const urlValName = `${name}.url`;
      setFieldValue(urlValName, value);
      setFieldValue(checkboxValName, Boolean(value.length)); // check checkbox if there is any input
    }
  };

  const getFiles = (files) => {
    setFiles(files);
    setFieldValue('files', files);
  };
  const handleFormReset = () => {
    setFormReset(!formReset);
    setFiles([]);
    handleReset();
  };

  return (
    <Box>
      {submitError && (
        <Alert
          ref={alertElement}
          id={'#alert'}
          severity="error"
          sx={{
            fontSize: '1.2rem',
            marginBottom: '2rem'
          }}
          elevation={4}
        >
          {submitError}
        </Alert>
      )}
      <form noValidate onSubmit={handleSubmit}>
        <Card
          sx={{
            padding: ['1.5rem 1rem', '1.5rem', '2rem'],
            '& legend': {
              margin: [
                '0 4.188rem 1rem 1rem',
                '0 0.188rem 1rem 0.5rem',
                '0 2.375rem 1rem 0.5rem'
              ]
            },
            '& p': {
              marginBottom: '1rem',
              typography: 'body2',
              fontSize: '1.25rem',
              lineHeight: '1.2',
              letterSpacing: '0.15px',
              ...starSpanStyles
            },
            '& h3': {
              marginTop: ['1.5rem'],
              marginBottom: ['1.5rem'],
              ...starSpanStyles
            },
            '& label': {
              marginLeft: ['0rem', '.5rem']
            },
            '& .MuiInputLabel-shrink': {
              marginLeft: ['0.9rem', '.5rem']
            }
          }}
          elevation={6}
        >
          <Typography variant="h2" component="legend">
            Your Info
          </Typography>
          <Typography
            variant="h3"
            component="p"
            sx={{
              margin: ['1rem 4.813rem 1rem 1rem', '1rem 0.313rem 1.5rem 0.5rem']
            }}
          >
            <span>*</span>Required
          </Typography>
          <Box
            sx={{
              '& .MuiFormControl-root': {
                width: ['100%', '47%'],
                marginBottom: '2.25rem'
              }
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: ['column', 'row'],
                marginTop: '1.5rem'
              }}
            >
              <TextField
                required
                sx={{
                  marginRight: '1.56rem'
                }}
                InputProps={inputFieldStyles}
                InputLabelProps={inputFieldStyles}
                id="outlined-required"
                label="First Name"
                name="firstName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
                error={errors.firstName && touched.firstName}
                helperText={touched.firstName ? errors.firstName : ''}
              />
              <TextField
                required
                InputProps={inputFieldStyles}
                InputLabelProps={inputFieldStyles}
                id="outlined-required"
                label="Last Name"
                name="lastName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
                error={errors.lastName && touched.lastName}
                helperText={touched.lastName ? errors.lastName : ''}
              />
            </Box>
            <Box>
              <TextField
                required
                InputProps={inputFieldStyles}
                InputLabelProps={inputFieldStyles}
                id="outlined-required"
                label="Email Address"
                name="email"
                onChange={handleChange}
                onBlur={async (e) => {
                  if (values.email) {
                    const isValidEmail = await ifEmailExists(values.email);
                    // if email is valid set error message to empty string or populate with proper error message
                    if (isValidEmail.validEmail) {
                      await setIfValidEmail('');
                    } else {
                      const notValidEmail =
                        !isValidEmail.validEmail && !isValidEmail.error
                          ? 'Email is in use. Choose different email'
                          : 'Server error. Fail to verify email';
                      await setIfValidEmail(notValidEmail);
                    }
                  } else {
                    await setIfValidEmail('');
                  }
                  handleBlur(e);
                }}
                value={values.email}
                error={errors.email && touched.email}
                helperText={touched.email ? errors.email : ''}
              />
            </Box>
            <Box>
              <TextField
                required
                InputProps={inputFieldStyles}
                InputLabelProps={inputFieldStyles}
                id="outlined-required"
                label="In which city do you reside?"
                name="city"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.city}
                error={errors.city && touched.city}
                helperText={touched.city ? errors.city : ''}
              />
            </Box>
          </Box>
          <Box>
            <Typography variant="h3" component="h3">
              What&apos;s the best place to find your work online? (Website,
              Behance, etc.)
              <span>*</span>
            </Typography>
            <FormGroup
              component="fieldset"
              onChange={(e) => handleChangeSocial(e, values)}
              sx={{
                '& div .MuiBox-root': {
                  marginBottom: '1.56rem',
                  display: 'flex',
                  flexDirection: ['column', 'row']
                }
              }}
            >
              <FormGroup>
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="website"
                        value="website"
                        checked={values.website.checked}
                      />
                    }
                    sx={{ width: '15%', ...labelStyles }}
                    label="Website"
                  />
                  <TextField
                    id="outlined-required"
                    sx={{
                      width: ['calc(100% - 2.7rem)', '50%'],
                      marginLeft: ['2.7rem', '2rem']
                    }}
                    InputProps={inputFieldStyles}
                    InputLabelProps={inputFieldStyles}
                    label="Website URL"
                    onBlur={handleBlur}
                    name="website"
                    value={values.website.url}
                    error={errors.website && touched.website}
                    helperText={touched.website ? errors.website?.url : ''} // ??
                  />
                </Box>
              </FormGroup>

              <FormGroup>
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="behance"
                        value="behance"
                        checked={values.behance.checked}
                      />
                    }
                    sx={{ width: '15%', ...labelStyles }}
                    label="Behance"
                  />
                  <TextField
                    id="outlined-required"
                    sx={{
                      width: ['calc(100% - 2.7rem)', '50%'],
                      marginLeft: ['2.7rem', '2rem']
                    }}
                    InputProps={inputFieldStyles}
                    InputLabelProps={inputFieldStyles}
                    label="Behance URL"
                    onBlur={handleBlur}
                    name="behance"
                    value={values.behance.url}
                    error={errors.behance && touched.behance}
                    helperText={touched.behance ? errors.behance?.url : ''} // ??
                  />
                </Box>
              </FormGroup>
              <FormGroup>
                <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="other"
                        value="other"
                        checked={values.other.checked}
                      />
                    }
                    sx={{ width: '15%', ...labelStyles }}
                    label="other"
                  />
                  <TextField
                    id="outlined-required"
                    sx={{
                      width: ['calc(100% - 2.7rem)', '50%'],
                      marginLeft: ['2.7rem', '2rem']
                    }}
                    InputProps={inputFieldStyles}
                    InputLabelProps={inputFieldStyles}
                    label="Other"
                    onBlur={handleBlur}
                    name="other"
                    value={values.other.url}
                    error={errors.other?.url && touched.other}
                    helperText={touched.other ? errors.other?.url : ''} // ??
                  />
                </Box>
              </FormGroup>
            </FormGroup>
          </Box>

          <Box>
            <Typography variant="h3" component="h3">
              What kind of artist are you? (Please list what apply)
              <span>*</span>
            </Typography>

            <Stack>
              <Autocomplete
                multiple
                key={formReset} // https://stackoverflow.com/questions/59790956/material-ui-autocomplete-clear-value
                id="tags-filled"
                options={categories.map((option) => option.name)}
                defaultValue={[categoriesDefaultValue]}
                freeSolo
                onBlur={handleBlur}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      key={option}
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                onChange={(event, value) => setFieldValue('categories', value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Artist types"
                    name="categories"
                    error={errors.categories && touched.categories}
                    helperText={touched.categories ? errors.categories : ''}
                  />
                )}
              />
            </Stack>
          </Box>
          <Upload
            getFiles={getFiles}
            files={imageFiles}
            formError={errors.files}
            errorsNum={Object.keys(errors).length} // shows how many errors are in the object to determine if upload component should be displayed
          />
          <Box
            sx={{
              '& p': {
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
                '& span:nth-of-type(2n)': {
                  color: 'primary.text',
                  opacity: '0.75',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  fontStyle: 'italic',
                  lineHeight: '1.33',
                  letterSpacing: '1px',
                  marginLeft: '0.938rem'
                }
              }}
            >
              Short description of what you do.
              <span>*</span>
              <span>1500 CHARACTERS MAX!</span>
            </Typography>
            <p>
              Example: Visual artist and musician whose work explores themes of
              nature, memory, trauma and identity. Reyes primarily creates
              participatory work that utilizes found objects and sounds of
              nature.
            </p>
            <FormControl fullWidth>
              <TextField
                id="outlined-textarea"
                label="Short description of what you do."
                minRows={6}
                inputProps={{ ...inputFieldStyles, maxLength: 1500 }}
                InputLabelProps={inputFieldStyles}
                multiline
                onBlur={handleBlur}
                value={values.description}
                name="description"
                onChange={handleChange}
                error={errors.description && touched.description} // ??
                helperText={touched.description ? errors.description : ''} // ??
              />
            </FormControl>
          </Box>
          <Box>
            <Typography variant="h3" component="h3">
              Please list up to 10 keywords that would describe your work and
              services.
              <span>*</span>
            </Typography>

            <Stack>
              <Autocomplete
                multiple
                key={formReset} // https://stackoverflow.com/questions/59790956/material-ui-autocomplete-clear-value
                id="tags-filled"
                options={tags.map((option) => option.name)}
                defaultValue={[tagsDefaultValue]}
                freeSolo
                onBlur={handleBlur}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      key={option}
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                onChange={(event, value) => setFieldValue('tags', value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="My 10 Keywords"
                    name="tags"
                    error={errors.tags && touched.tags}
                    helperText={touched.tags ? errors.tags : ''}
                  />
                )}
              />
            </Stack>
          </Box>
          <Box
            sx={{
              '& p': {
                typography: 'body1',
                fontSize: ['0.75rem', '0.75rem', '0.75rem', '0.75rem'],
                fontStyle: 'italic',
                lineHeight: '1.33',
                letterSpacing: '0.4px',
                marginTop: '0',
                marginBottom: '1.25rem'
              }
            }}
          >
            <Typography variant="h3" component="h3">
              Do you have skills, artistic or otherwise, for which you could be
              hired by Network visitors? If so, please list.
              <span>*</span>
            </Typography>
            <p>Example: DJ, wedding photographer, translation work, welding.</p>
            <Stack>
              <Autocomplete
                key={formReset}
                multiple
                id="tags-filled"
                options={skills.map((option) => option.name)}
                defaultValue={[skillsDefaultValue]}
                freeSolo
                onBlur={handleBlur}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip
                      key={option}
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                onChange={(event, value) => setFieldValue('skills', value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="skills"
                    label="My 10 Keywords"
                    error={errors.skills && touched.skills}
                    // touched={touched.skills} // ??
                    helperText={touched.skills ? errors.skills : ''} // ??∂
                  />
                )}
              />
            </Stack>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ '& img': { marginTop: '2rem', marginRight: '2rem' } }}>
              <img src="/images/img-newsletter.svg" alt="Evelope" />
            </Box>
            <Box sx={{ width: '75%' }}>
              <Typography variant="h3" component="h3">
                Would you like to subscribe to our monthly newsletter about
                local art opportunities?
              </Typography>
              <RadioGroup
                row
                aria-label="newsletter"
                name="row-radio-buttons-group"
                value={values.subscribedToNewsletter}
              >
                <FormControlLabel
                  value="yes"
                  control={<Radio />}
                  label={<span style={{ fontSize: '1rem' }}>{'Yes!'}</span>}
                  name="subscribedToNewsletter"
                  onChange={handleChange}
                />
                <FormControlLabel
                  value="no"
                  control={<Radio />}
                  label={<span style={{ fontSize: '1rem' }}>{'No'}</span>}
                  onChange={handleChange}
                  name="subscribedToNewsletter"
                />
              </RadioGroup>
            </Box>
          </Box>
        </Card>
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
              marginBottom: '0.813rem'
            }
          }}
        >
          <Button
            type="submit"
            disabled={!isValid || !dirty || isSubmitting}
            variant="contained"
            startIcon={<SendIcon />}
          >
            Submit Form
          </Button>
          <Button
            type="reset"
            variant="outlined"
            startIcon={<DeleteOutlineIcon />}
            onClick={handleFormReset}
          >
            Clear Form
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CreateProfileForm;
