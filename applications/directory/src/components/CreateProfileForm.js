// TODO - check error in console -  GET http://localhost:3002/artists/edit-profile-token/undefined 404 (Not Found)

// TODO validation -  make sure at least one social link provided or delete the * for the social being required??
// TODO - change marginLeft for input social on mobile
// TODO reduce font size in drop-downs (bigger screen)?

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import PropTypes from 'prop-types'; // CreateProfileForm.propTypes = {className: PropTypes.string,} TODO - are we going to use classes?
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
import * as Yup from 'yup';
import Upload from './Upload';
import NewsLetterIcon from '../icons/newsletter.svg';
import { useEmailValidation, useArtist, usePendingArtist } from '../hooks';

const categoriesDefaultValue = 'Dancer';
const tagsDefaultValue = 'Education';
const skillsDefaultValue = 'Carpentry';

// TODO - this function will go to a different file as a helper function because most likely it will be used in other components
// convert artist data from backend to the values to be excepted by the form's "initial values"
const parseArtist = (artist) => {
  // check if artist is an empty object
  if (Object.keys(artist).length === 0) {
    return false;
  }

  const {
    firstName,
    lastName,
    email,
    city,
    description,
    categories,
    social,
    tags,
    skills,
    images
  } = artist;

  // parse images array to shape them into the form Upload component uses them to upload new images
  const parsedImages = images.map((image) => {
    const imageName = image.split('/').at(-1); // returns last array value which is a file name
    return {
      fileName: imageName,
      file: { name: imageName, preview: image },
      uploadError: undefined,
      signedUrlError: undefined,
      uploaded: true,
      loading: false
    };
  });

  // convert social to object
  const parsedExistingSocial = social.reduce((list, item) => {
    return {
      ...list,
      [item.name]: {
        name: item.name,
        url: item.url,
        checked: Boolean(item.url)
      }
    };
  }, {});

  // create list of social like initial values for the form
  const socialInitialValues = {
    website: { checked: true, name: 'website', url: '' },
    behance: { checked: false, name: 'behance', url: '' },
    other: { checked: false, name: 'other', url: '' }
  };

  // parsedExistingSocial  overrides initial values with the values from the db and create an array of all 3 social to use in the form
  const socialParsed = { ...socialInitialValues, ...parsedExistingSocial };

  // convert from boolean values to yes/no strings
  const subscribedToNewsletter = artist.subscribedToNewsletter ? 'yes' : 'no';

  const existingArtist = {
    firstName,
    lastName,
    email,
    city,
    description,
    categories,
    tags,
    skills,
    files: parsedImages,
    ...socialParsed,
    subscribedToNewsletter
  };

  return existingArtist;
};

const socialList = [
  { name: 'website', label: 'Website URL' },
  { name: 'behance', label: 'Behance URL' },
  { name: 'other', label: 'Other' }
];

const keywordsValidate = (keywords) =>
  keywords.every(
    (keyword) =>
      /^([a-zA-Z- ]+)?$/g.test(keyword) &&
      keyword.length < 30 &&
      keyword.length > 3
  );

const inputFieldStyles = {
  style: {
    fontSize: '1rem',
    '& :firstLetter': {
      textTransform: 'capitalize'
    }
  }
};

const StarSpan = ({ children }) => (
  <Box component="span" sx={{ color: 'primary.main' }}>
    {children}
  </Box>
);

const h3Styles = {
  marginTop: ['1.5rem'],
  marginBottom: ['1.5rem'],
  fontSize: ['1.25rem']
};

const buttonStyles = {
  width: ['19.438rem', '11.063rem'],
  marginBottom: '0.813rem'
};

const pExampleStyles = {
  typography: 'body1',
  fontSize: ['0.75rem', '0.75rem', '0.75rem', '0.75rem'],
  fontStyle: 'italic',
  lineHeight: '1.33',
  letterSpacing: '0.4px',
  marginTop: '0',
  marginBottom: '1rem'
};

const CreateProfileForm = ({
  categories = [categoriesDefaultValue],
  tags = [tagsDefaultValue],
  skills = [skillsDefaultValue],
  artist = {}
}) => {
  const router = useRouter();

  const initialValues = {
    firstName: '',
    lastName: '',
    email: artist ? artist.email : '',
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
  const parsedArtist = parseArtist(artist);

  const [ifValidEmail, setIfValidEmail] = useState('');
  const [formReset, setFormReset] = useState(null);
  const [imageFiles, setFiles] = useState(
    parsedArtist.files || initialValues.files
  );

  const { saveArtist } = useArtist();
  const { savePendingArtist } = usePendingArtist();
  const { ifEmailExists } = useEmailValidation();
  const [submissionError, setSubmissionError] = useState('');

  // get the element to scroll into view if displayed
  const alertElement = useRef();

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
    initialValues: parsedArtist || initialValues,
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
      // create deep array copy to not effect original form values when deleting "checked" property
      const social = JSON.parse(JSON.stringify([website, behance, other]))
        .map((item) => {
          delete item.checked;
          return item;
        })
        .filter((item) => item.url);

      const images = files.map(({ fileName }) => fileName);

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
        if (Object.keys(artist).length !== 0) {
          await savePendingArtist(data, artist.editProfileToken);
        } else {
          await saveArtist(data);
        }

        // redirect to a thank-you page if the artist created successfully
        router.push({
          pathname: `/profile/thank-you/`, // TODO modify thank you page to make it work for a new artist and after editing profile??
          query: { name: firstName }
        });
        resetForm();
        setFiles([]); // delete files
        setSubmissionError('');
      } catch (error) {
        setSubmissionError(
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
    setFormReset(Math.random()); // form reset needs a random values to change the key prop of Autocomplete, which causes the component to re-render with the default values
    setFiles([]);
    // works for both reset form for new artist and form for editing existing artist whose profile was rejected
    setValues({ ...initialValues });
    setTouched({}, false);
  };

  return (
    <Box>
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
          <Typography
            variant="h2"
            component="legend"
            sx={{
              margin: [
                '0 4.188rem 1rem 1rem',
                '0 0.188rem 1rem 0.5rem',
                '0 2.375rem 1rem 0.5rem'
              ]
            }}
          >
            Your Info
          </Typography>
          <Typography
            component="h3"
            sx={{
              margin: [
                '1rem 4.813rem 1rem 1rem',
                '1rem 0.313rem 1.5rem 0.5rem'
              ],
              marginBottom: '1rem',
              typography: 'body2',
              fontSize: '1.25rem',
              lineHeight: '1.2',
              letterSpacing: '0.15px'
            }}
          >
            <StarSpan>*</StarSpan>
            Required
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
                disabled={Boolean(parsedArtist)} // the field is disabled if an artist editing the form after initial profile rejection
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
                helperText={
                  touched.email
                    ? errors.email
                    : (parsedArtist && 'Email cannot be changed!') || ''
                }
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
            <Typography variant="h3" component="h3" sx={h3Styles}>
              What&apos;s the best place to find your work online? (Website,
              Behance, etc.)
              <StarSpan>*</StarSpan>
            </Typography>
            <FormGroup
              component="fieldset"
              onChange={(e) => handleChangeSocial(e, values)}
            >
              {socialList.map(({ name, label }, index) => (
                <FormGroup
                  sx={{
                    '& .MuiBox-root': {
                      marginBottom: '1.56rem',
                      display: 'flex',
                      flexDirection: ['column', 'row']
                    }
                  }}
                  key={index}
                >
                  <Box>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={name}
                          value={name}
                          checked={values[name].checked}
                        />
                      }
                      sx={{
                        width: '15%',
                        '& span': {
                          fontSize: '1rem',
                          textTransform: 'capitalize'
                        }
                      }}
                      label={name}
                    />
                    <TextField
                      id="outlined-required"
                      sx={{
                        width: ['calc(100% - 2.7rem)', '50%'],
                        marginLeft: ['2.7rem', '2rem']
                      }}
                      InputProps={inputFieldStyles}
                      InputLabelProps={inputFieldStyles}
                      label={label}
                      onBlur={handleBlur}
                      name={name}
                      value={values[name].url}
                      error={errors[name]?.url && touched[name]}
                      helperText={touched[name] ? errors[name]?.url : ''}
                    />
                  </Box>
                </FormGroup>
              ))}
            </FormGroup>
          </Box>

          <Box>
            <Typography variant="h3" component="h3" sx={h3Styles}>
              What kind of artist are you? (Please list what apply)
              <StarSpan>*</StarSpan>
            </Typography>

            <Stack>
              <Autocomplete
                multiple
                key={formReset} // https://stackoverflow.com/questions/59790956/material-ui-autocomplete-clear-value
                id="tags-filled"
                options={categories.map((option) => option.name)}
                defaultValue={
                  (!formReset && artist.categories) || [categoriesDefaultValue]
                } // populates the field if a new artist editing their profile and lets reset to default (initial values)
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
          <Box>
            <Typography variant="h3" component="h3" sx={h3Styles}>
              Short description of what you do.
              <StarSpan>*</StarSpan>
              <Box
                component="span"
                sx={{
                  color: 'primary.text',
                  opacity: '0.75',
                  fontSize: '0.875rem',
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
            <Typography component="p" sx={pExampleStyles}>
              Example: Visual artist and musician whose work explores themes of
              nature, memory, trauma and identity. Reyes primarily creates
              participatory work that utilizes found objects and sounds of
              nature.
            </Typography>
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
                error={errors.description && touched.description}
                helperText={touched.description ? errors.description : ''}
              />
            </FormControl>
          </Box>
          <Box>
            <Typography variant="h3" component="h3" sx={h3Styles}>
              Please list up to 10 keywords that would describe your work and
              services.
              <StarSpan>*</StarSpan>
            </Typography>

            <Stack>
              <Autocomplete
                multiple
                key={formReset} // https://stackoverflow.com/questions/59790956/material-ui-autocomplete-clear-value
                id="tags-filled"
                options={tags.map((option) => option.name)}
                defaultValue={(!formReset && artist.tags) || [tagsDefaultValue]} // populate the field if a new artist editing their profile and lets reset to default (initial values)
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
          <Box>
            <Typography variant="h3" component="h3" sx={h3Styles}>
              Do you have skills, artistic or otherwise, for which you could be
              hired by Network visitors? If so, please list.
              <StarSpan>*</StarSpan>
            </Typography>
            <Typography component="p" sx={pExampleStyles}>
              Example: DJ, wedding photographer, translation work, welding.
            </Typography>
            <Stack>
              <Autocomplete
                key={formReset}
                multiple
                id="tags-filled"
                options={skills.map((option) => option.name)}
                defaultValue={
                  (!formReset && artist.skills) || [skillsDefaultValue]
                } // populate the field if a new artist editing their profile and lets reset to default (initial values)
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
                    helperText={touched.skills ? errors.skills : ''}
                  />
                )}
              />
            </Stack>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Box sx={{ marginRight: '1.5rem' }}>
              <NewsLetterIcon sx={{ fontSize: 24, fontWeight: 'bold' }} />
            </Box>

            <Box sx={{ width: '75%' }}>
              <Typography variant="h3" component="h3" sx={h3Styles}>
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
            justifyContent: ['center', 'space-between']
          }}
        >
          <Button
            type="submit"
            disabled={!isValid || !dirty || isSubmitting}
            variant="contained"
            startIcon={<SendIcon />}
            sx={buttonStyles}
          >
            Submit Form
          </Button>
          <Button
            type="reset"
            variant="outlined"
            startIcon={<DeleteOutlineIcon />}
            onClick={handleFormReset}
            sx={buttonStyles}
          >
            Clear Form
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CreateProfileForm;
