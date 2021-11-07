import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import classes from './LoginInfo.module.scss';

function LoginInfo() {
  return (
    <form className={classes.loginInfoForm}>
      <legend className={classes.formTitle}>Login Info</legend>
      <p className={classes.fieldTitle}>
        <span className={classes.required}>*</span>Required
      </p>
      <div className={classes.email}>
        <FormControl sx={{ mr: 1, width: '50%' }}>
          <TextField
            id="outlined-required"
            label="Email Address"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutlineIcon />
                </InputAdornment>
              )
            }}
            style={{ marginBottom: 25 }}
            required
          />
        </FormControl>
      </div>
      <div>
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          style={{ width: '50%', marginBottom: 25 }}
          required
        />
      </div>
      <div>
        <TextField
          id="outlined-password-input"
          label="Confirm Password"
          type="password"
          autoComplete="current-password"
          style={{ width: '50%', marginBottom: 25 }}
          required
        />
      </div>
    </form>
  );
}

export default LoginInfo;
