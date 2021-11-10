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
import Upload from './Upload';

const topArtistServices = [
  { title: 'Painting' },
  { title: 'Drawing' },
  { title: 'Ceramics' },
  { title: 'Musician' },
  { title: 'Muralist' },
  { title: 'Drag Queen' },
  { title: 'Theatre Artist' }
];

const topArtistMarketableServices = [
  { title: 'D.J.' },
  { title: 'Wedding Photographer' },
  { title: 'Logo Creation' }
];

const requiredArrayValidation = (fieldId, fieldName, entries) => {
  if (!entries[fieldId]?.length > 0) {
    return { success: false, message: `${fieldName} is required.` };
  }
};

/*
  fieldId is used to check for values against the submitted object keys
  validate is an optional callback in case something more than standard truthiness is needed for the check
 */
const requiredFields = [
  { fieldId: 'firstName', fieldName: 'First name' },
  { fieldId: 'lastName', fieldName: 'Last name' },
  { fieldId: 'email', fieldName: 'Email' },
  { fieldId: 'city', fieldName: 'City' },
  { fieldId: 'social', fieldName: 'Social' },
  { fieldId: 'artistType', fieldName: 'Artist type' },
  { fieldId: 'description', fieldName: 'Description' },
  {
    fieldId: 'keywords',
    fieldName: 'Keywords',
    validate: requiredArrayValidation
  },
  {
    fieldId: 'skills',
    fieldName: 'Hireable skills',
    validate: requiredArrayValidation
  }
];

function CreateProfileForm({ className }) {
  const handleSubmit = (event, values = {}) => {
    const entries = Object.entries(values);
    const defaultValidation = (fieldId, fieldName, entriesArray) => {
      if (!entriesArray[fieldId]) {
        return { success: false, message: `${fieldName} is required.` };
      }
      return { success: true };
    };

    let validationResult = { success: true };
    requiredFields.every(
      ({ fieldId, fieldName, validate = defaultValidation }) => {
        validationResult = validate(fieldId, fieldName, entries);
        return validationResult.success; // Break out of the loop on the first failure
      }
    );
    if (!validationResult.success) {
      event.preventDefault();
      window.alert(validationResult.message);
      return false;
    }
    return true;
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
              />
              <TextField
                required
                sx={{ width: '47%', mb: '25px' }}
                id="outlined-required"
                label="Last Name"
              />
            </Box>
            <div>
              <TextField
                required
                sx={{ width: '47%', mb: '25px' }}
                id="outlined-required"
                label="Email Address"
              />
            </div>
            <div>
              <TextField
                required
                sx={{ width: '47%', mb: '25px' }}
                id="outlined-required"
                label="In which city do you reside?"
              />
            </div>
          </Box>

          <Box>
            <p>
              What&apos;s the best place to find your work online? (Website,
              Behance, etc.)
              <span>*</span>
            </p>
            <FormGroup>
              <Box sx={{ display: 'flex', mb: '25px' }}>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  sx={{ width: '15%' }}
                  label="Website"
                />
                <TextField
                  id="outlined-required"
                  sx={{ width: '50%' }}
                  label="Website URL"
                />
              </Box>
            </FormGroup>
            <FormGroup>
              <Box sx={{ display: 'flex', mb: '25px' }}>
                <FormControlLabel
                  control={<Checkbox />}
                  sx={{ width: '15%' }}
                  label="Behance"
                />
                <TextField
                  id="outlined-required"
                  sx={{ width: '50%' }}
                  label="Behance URL"
                />
              </Box>
            </FormGroup>
            <FormGroup>
              <Box sx={{ display: 'flex', mb: '25px' }}>
                <FormControlLabel
                  control={<Checkbox />}
                  sx={{ width: '15%' }}
                  label=""
                />
                <TextField
                  id="outlined-required"
                  sx={{ width: '50%' }}
                  label="Other"
                />
              </Box>
            </FormGroup>
          </Box>

          <Box>
            <p>
              What kind of artist are you? (Check all that apply)
              <span>*</span>
            </p>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Dancer"
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Musician" />
            </FormGroup>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Theatre Artist" />
            </FormGroup>
            <FormGroup>
              <Box sx={{ display: 'flex', mb: '25px' }}>
                <FormControlLabel control={<Checkbox />} label="" />
                <TextField
                  id="outlined-required"
                  sx={{ width: '75%' }}
                  label="Other Artist Type"
                />
              </Box>
            </FormGroup>
          </Box>

          <Upload />

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
                id="tags-filled"
                options={topArtistServices.map((option) => option.title)}
                defaultValue={[topArtistServices[1].title]}
                freeSolo
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
                renderInput={(params) => (
                  <TextField
                    {...params}
                    minRows={2}
                    multiline
                    label="My 10 Keywords"
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
                multiple
                id="tags-filled"
                options={topArtistMarketableServices.map(
                  (option) => option.title
                )}
                defaultValue={[topArtistMarketableServices[1].title]}
                freeSolo
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
                renderInput={(params) => (
                  <TextField
                    {...params}
                    minRows={2}
                    multiline
                    label="My 10 Keywords"
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
              >
                <FormControlLabel
                  value="yes"
                  control={<Radio />}
                  label="Yes!"
                  defaultChecked
                />
                <FormControlLabel value="no" control={<Radio />} label="No" />
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
          <Button type="submit" variant="contained" startIcon={<SendIcon />}>
            Submit Form
          </Button>
          <Button
            type="reset"
            variant="outlined"
            startIcon={<DeleteOutlineIcon />}
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
