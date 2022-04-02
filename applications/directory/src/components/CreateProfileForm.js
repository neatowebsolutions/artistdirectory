// TODO validation -  make sure at least one social link provided
// ERROR - MUI: Unable to find the input element. It was resolved to [object HTMLTextAreaElement] while an HTMLInputElement was expected.

import { useState } from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
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

// parse keywords(skills, categories, tags) list to separate existed in database from added by user
const parseKeywords = (keywords, databaseList) => {
  return keywords.reduce(
    (list, item) => {
      const found = databaseList.find(
        (databaseItem) => databaseItem.name.toLowerCase() === item.toLowerCase()
      );
      if (found) {
        list.existed.push(found._id);
      } else {
        list.added.push(item);
      }
      return list;
    },
    { existed: [], added: [] }
  );
};

const categoriesDefaultValue = 'Dancer';
const tagsDefaultValue = 'Education';
const skillsDefaultValue = 'Carpentry';

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  city: '',
  description: '',
  website: { checked: true, name: 'website', url: '' },
  behance: { checked: false, name: 'behance', url: '' },
  other: { checked: false, name: 'other', url: '' },
  files: [],
  categories: [categoriesDefaultValue],
  tags: [tagsDefaultValue],
  skills: [skillsDefaultValue],
  subscribedToNewsletter: 'yes'
};

// TODO: validation to ensure user enters either website, behance or other
const formValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  city: Yup.string().required('City is required'),
  email: Yup.string()
    .email('Please provide a valid email address.')
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
        .required('Please enter behance url') // ??????
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
  category: Yup.object({
    checked: Yup.boolean(),
    name: Yup.string().when('checked', {
      is: true,
      then: Yup.string() // /^([a-zA-Z-]+,?\s*)+/g
        .matches(/^([a-zA-Z-, ]+)?$/g, 'Enter correct artist type!')
        .required('Please enter artist type') // ??????
    })
  }),
  // what is the validation rule?
  description: Yup.string()
    .test(
      'len',
      'Must be at least 10 characters and not longer than 1500 characters', // what is the min length?
      (val) => val && val.length > 10 && val.length <= 1500
    )
    .required('Desctiption is required'),
  categories: Yup.array()
    .test('categories', 'Enter valid artist type', (categories) =>
      categories.every(
        (category) =>
          /^([a-zA-Z- ]+)?$/g.test(category) &&
          category.length < 30 &&
          category.length > 3
      )
    )
    .min(1, 'Please provide at least one artist type'),
  tags: Yup.array()
    .test('tags', 'Enter valid keyword', (tags) =>
      tags.every(
        (tag) =>
          /^([a-zA-Z- ]+)?$/g.test(tag) && tag.length < 30 && tag.length > 3
      )
    )
    .min(1, 'Please choose at least one keyword'),
  skills: Yup.array()
    .test('skills', 'Enter valid keyword', (skills) =>
      skills.every(
        (skill) =>
          /^([a-zA-Z- ]+)?$/g.test(skill) &&
          skill.length < 30 &&
          skill.length > 3
      )
    )
    .min(1, 'Please choose at least one keyword')
});
// social: Yup.string().when(["website", "behance", "other"], {
//   is: (...fields) => fields.some((field) => field.checked !== true),
//   then: Yup.string().required("Please choose one of the options"),
// }),

function CreateProfileForm({
  className,
  categories = [categoriesDefaultValue],
  tags = [tagsDefaultValue],
  skills = [skillsDefaultValue]
}) {
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
    touched
  } = useFormik({
    initialValues,
    enableReinitialize: true, // lets the form to go back to initial values if reset form
    validationSchema: formValidationSchema,
    onSubmit: (vals) => {
      const {
        firstName,
        lastName,
        email,
        city,
        description,
        website,
        behance,
        other,
        files,
        subscribedToNewsletter,
        categories: allCategories,
        tags: allTags,
        skills: allSkills
      } = vals;

      // user social links
      const social = [website, behance, other].map((item) => {
        delete item.checked;
        return item;
      });

      const parsedCategories = parseKeywords(allCategories, categories);
      const parsedTags = parseKeywords(allTags, tags);
      const parsedSkills = parseKeywords(allSkills, skills);

      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('email', email);
      formData.append('city', city);
      formData.append('description', description);
      formData.append('social', social);
      formData.append('categories', parsedCategories);
      formData.append('tags', parsedTags);
      formData.append('skills', parsedSkills);
      formData.append('files', files);
      formData.append('subscribedToNewsletter', subscribedToNewsletter);

      console.log([...formData]);

      // TODO - do something to submit data to the backend

      resetForm();
    }
  });

  const [formReset, setFormReset] = useState(false);
  const [imageFiles, setFiles] = useState(initialValues.files);

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

  // block from my old version
  // const handleCategoryChange = (e) => {
  //   const { name, type, value, checked } = e.target;
  //   // console.log(name, type, value, checked);
  //   if (type === "checkbox") {
  //     if (checked) {
  //       setFieldValue(`${name}.checked`, checked);
  //     }
  //     if (name === "category") setFieldValue(name, { checked, name: "" });
  //   } else {
  //     setFieldValue("category", {
  //       checked: Boolean(value),
  //       name: value,
  //     });
  //   }
  // };

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
    <div className={className}>
      <form noValidate onSubmit={handleSubmit}>
        <Card
          sx={{
            '& legend': {
              typography: 'body2',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              lineHeight: '1',
              letterSpacing: '0.18px'
            },
            '& p': {
              typography: 'body2',
              fontSize: '20px',
              lineHeight: '1.2',
              letterSpacing: '0.15px',
              '& span': {
                color: 'primary.main'
              }
            }
          }}
          elevation={6}
        >
          <legend>Your Info</legend>
          <p>
            <span>*</span>Required
          </p>

          <Box>
            <Box>
              <TextField
                required
                sx={{ width: '47%', mb: '25px', mr: '25px' }}
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
                sx={{ width: '47%', mb: '25px' }}
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
            <div>
              <TextField
                required
                sx={{ width: '47%', mb: '25px' }}
                id="outlined-required"
                label="Email Address"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={errors.email && touched.email}
                helperText={touched.email ? errors.email : ''}
              />
            </div>
            <div>
              <TextField
                required
                sx={{ width: '47%', mb: '25px' }}
                id="outlined-required"
                label="In which city do you reside?"
                name="city"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.city}
                error={errors.city && touched.city}
                helperText={touched.city ? errors.city : ''}
              />
            </div>
          </Box>

          <Box>
            <p>
              What&apos;s the best place to find your work online? (Website,
              Behance, etc.)
              <span>*</span>
            </p>
            <FormGroup
              component="fieldset"
              onChange={(e) => handleChangeSocial(e, values)}
            >
              <FormGroup>
                <Box sx={{ display: 'flex', mb: '25px' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="website"
                        value="website"
                        checked={values.website.checked}
                      />
                    }
                    sx={{ width: '15%' }}
                    label="Website"
                  />
                  <TextField
                    id="outlined-required"
                    sx={{ width: '50%' }}
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
                <Box sx={{ display: 'flex', mb: '25px' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="behance"
                        value="behance"
                        checked={values.behance.checked}
                      />
                    }
                    sx={{ width: '15%' }}
                    label="Behance"
                  />
                  <TextField
                    id="outlined-required"
                    sx={{ width: '50%' }}
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
                <Box sx={{ display: 'flex', mb: '25px' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="other"
                        value="other"
                        checked={values.other.checked}
                      />
                    }
                    sx={{ width: '15%' }}
                    label="other"
                  />
                  <TextField
                    id="outlined-required"
                    sx={{ width: '50%' }}
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
            <p>
              What kind of artist are you? (Please list what apply)
              <span>*</span>
            </p>

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
                    minRows={2}
                    multiline
                    label="Artist types"
                    name="categories"
                    error={errors.categories && touched.categories}
                    helperText={touched.categories ? errors.categories : ''}
                  />
                )}
              />
            </Stack>
          </Box>

          <Upload getFiles={getFiles} files={imageFiles} />

          <Box
            sx={{
              '& span:nth-child(2)': {
                color: 'primary.text',
                opacity: '0.75',
                fontSize: '14px',
                fontWeight: '500',
                fontStyle: 'italic',
                lineHeight: '1.33',
                letterSpacing: '1px',
                ml: '15px'
              },
              '& p:nth-child(2)': {
                typography: 'body1',
                fontSize: '12px',
                fontStyle: 'italic',
                lineHeight: '1.33',
                letterSpacing: '0.4px',
                mt: '0'
              }
            }}
          >
            <p>
              Short description of what you do.
              <span>*</span>
              <span>1500 CHARACTERS MAX!</span>
            </p>
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
                inputProps={{ maxLength: 1500 }}
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
            <p>
              Please list up to 10 keywords that would describe your work and
              services.
              <span>*</span>
            </p>

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
                    minRows={2}
                    multiline
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
              '& p:nth-child(2)': {
                typography: 'body1',
                fontSize: '12px',
                fontStyle: 'italic',
                lineHeight: '1.33',
                letterSpacing: '0.4px',
                mt: '0',
                mb: '20px'
              }
            }}
          >
            <p>
              Do you have skills, artistic or otherwise, for which you could be
              hired by Network visitors? If so, please list.
              <span>*</span>
            </p>
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
                    minRows={2}
                    multiline
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
            <Box sx={{ '& img': { mt: '2rem', mr: '2rem' } }}>
              <img src="/images/img-newsletter.svg" alt="Evelope" />
            </Box>
            <Box sx={{ width: '75%' }}>
              <p>
                Would you like to subscribe to our monthly newsletter about
                local art opportunities?
              </p>
              <RadioGroup
                row
                aria-label="newsletter"
                name="row-radio-buttons-group"
                value={values.subscribedToNewsletter}
              >
                <FormControlLabel
                  value="yes"
                  control={<Radio />}
                  label="Yes!"
                  name="subscribedToNewsletter"
                  onChange={handleChange}
                />
                <FormControlLabel
                  value="no"
                  control={<Radio />}
                  label="No"
                  onChange={handleChange}
                  name="subscribedToNewsletter"
                />
              </RadioGroup>
            </Box>
          </Box>
        </Card>
        <Box
          sx={{
            maxWidth: '782px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            mt: '2rem'
          }}
        >
          <Button
            type="submit"
            disabled={!isValid || !dirty}
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
    </div>
  );
}

CreateProfileForm.propTypes = {
  className: PropTypes.string
};

export default CreateProfileForm;
