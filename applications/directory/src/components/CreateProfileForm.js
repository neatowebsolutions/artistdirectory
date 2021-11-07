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
import UploadThumbnail from './UploadThumbnail';
import classes from './CreateProfileForm.module.scss';

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
    fieldId: 'hireableSkills',
    fieldName: 'Hireable skills',
    validate: requiredArrayValidation
  }
];

function CreateProfileForm() {
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
    <form noValidate onSubmit={handleSubmit}>
      <Card className={classes.formCard} elevation={6}>
        <legend className={classes.formTitle}>Your Info</legend>
        <p className={classes.fieldTitle}>
          <span className={classes.required}>*</span>Required
        </p>
        <div className={classes.contact}>
          <div>
            <TextField
              required
              style={{ width: '47%', marginBottom: 25, marginRight: 25 }}
              id="outlined-required"
              label="First Name"
            />
            <TextField
              required
              style={{ width: '47%', marginBottom: 25 }}
              id="outlined-required"
              label="Last Name"
            />
          </div>
          <div>
            <div>
              <TextField
                required
                style={{ width: '47%', marginBottom: 25 }}
                id="outlined-required"
                label="Email Address"
              />
            </div>
            <div>
              <TextField
                required
                style={{ width: '47%', marginBottom: 25 }}
                id="outlined-required"
                label="In which city do you reside?"
              />
            </div>
          </div>
        </div>
        <div>
          <p className={classes.fieldTitle}>
            What&apos;s the best place to find your work online? (Website,
            Behance, etc.)
            <span className={classes.required}>*</span>
          </p>
          <FormGroup>
            <div className={classes.urls}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                style={{ width: '15%' }}
                label="Website"
              />
              <TextField
                id="outlined-required"
                style={{ width: '50%' }}
                label="Website URL"
              />
            </div>
          </FormGroup>
          <FormGroup>
            <div className={classes.urls}>
              <FormControlLabel
                control={<Checkbox />}
                style={{ width: '15%' }}
                label="Behance"
              />
              <TextField
                id="outlined-required"
                style={{ width: '50%' }}
                label="Behance URL"
              />
            </div>
          </FormGroup>
          <FormGroup>
            <div className={classes.urls}>
              <FormControlLabel
                control={<Checkbox />}
                style={{ width: '15%' }}
                label=""
              />
              <TextField
                id="outlined-required"
                style={{ width: '50%' }}
                label="Other"
              />
            </div>
          </FormGroup>
        </div>
        <div>
          <p className={classes.fieldTitle}>
            What kind of artist are you? (Check all that apply)
            <span className={classes.required}>*</span>
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
            <div className={classes.other}>
              <FormControlLabel control={<Checkbox />} label="" />
              <TextField
                id="outlined-required"
                style={{ width: '75%' }}
                label="Other Artist Type"
              />
            </div>
          </FormGroup>
        </div>
        <div>
          <p className={classes.fieldTitle}>
            Add up to 5 images of your work - up to 2mb in size
            <span className={classes.required}>*</span>
          </p>
          <div className={classes.dropUpload}>
            <div>
              <img src="/images/img-artupload.svg" alt="Art Upload Frame" />
            </div>
            <div className={classes.browse}>
              <p>Drag and drop here, or</p>
              <Button variant="contained">Browse</Button>
            </div>
          </div>
          <div className={classes.uploadArea}>{/* <UploadThumbnail /> */}</div>
          <div>
            <p className={classes.fieldTitle}>
              Short description of what you do.
              <span className={classes.required}>*</span>
              <span className={classes.caveat}>1500 CHARACTERS MAX!</span>
            </p>
            <p className={classes.example}>
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
          </div>
          <div>
            <p className={classes.fieldTitle}>
              Please list up to 10 keywords that would describe your work and
              services.
              <span className={classes.required}>*</span>
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
          </div>
          <div>
            <p className={classes.fieldTitle}>
              Do you have skills, artistic or otherwise, for which you could be
              hired by Network visitors? If so, please list.
              <span className={classes.required}>*</span>
            </p>
            <p className={classes.example}>
              Example: DJ, wedding photographer, translation work, welding.
            </p>
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
          </div>
          <div className={classes.newsletter}>
            <div className={classes.image}>
              <img src="/images/img-newsletter.svg" alt="Evelope" />
            </div>
            <div className={classes.field}>
              <p className={classes.fieldTitle}>
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
            </div>
          </div>
        </div>
      </Card>
      <div className={classes.formActions}>
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
      </div>
    </form>
  );
}

export default CreateProfileForm;
