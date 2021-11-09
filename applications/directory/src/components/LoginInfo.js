import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

function LoginInfo() {
  return (
    <form>
      <legend className="formTitle">Login Info</legend>
      <p className="fieldTitle">
        <span className="required">*</span>Required
      </p>
      <Box sx={{ mb: 2 }}>
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
          sx={{ width: '50%' }}
          required
        />
      </Box>
      <Box sx={{ mb: 2 }}>
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          sx={{ width: '50%' }}
          required
        />
      </Box>
      <Box>
        <TextField
          id="outlined-password-input"
          label="Confirm Password"
          type="password"
          autoComplete="current-password"
          sx={{ width: '50%' }}
          required
        />
      </Box>
    </form>
  );
}

export default LoginInfo;
