import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Button from '@mui/material/Button';
import VerifiedIcon from '@mui/icons-material/Verified';

function CreateAccount() {
  return (
    <Card
      sx={{
        flex: 1,
        textAlign: 'center',
        border: '2px solid',
        borderColor: 'secondary.secondary',
        '& p.create': {
          color: 'secondary.secondary',
          fontSize: '1.875rem',
          fontWeight: '500',
          mt: 0
        },
        '& form': {
          '& legend.formTitle': {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            lineHeight: '1',
            letterSpacing: '0.18px'
          },
          '& p': {
            typography: 'body2',
            fontSize: '1.25rem',
            lineHeight: '1.2',
            letterSpacing: '0.15px',
            margin: '1rem 0',
            '& span': {
              color: 'primary.main'
            }
          }
        }
      }}
      elevation={6}
    >
      <p className="create">
        While you&apos;re at it, create an account to manage your work and
        update your profile in the future.
      </p>
      <form>
        <legend className="formTitle">Create an Account</legend>
        <p>
          <span>*</span>Required
        </p>
        <Box sx={{ mb: 2, mt: 3 }}>
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
            sx={{ minWidth: ['100%', '100%', '325px'] }}
            required
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            sx={{ minWidth: ['100%', '100%', '325px'] }}
            required
          />
        </Box>
        <Box>
          <TextField
            id="outlined-password-input"
            label="Confirm Password"
            type="password"
            autoComplete="current-password"
            sx={{ minWidth: ['100%', '100%', '325px'] }}
            required
          />
        </Box>
        <Button
          sx={{ mt: 3, mb: 1, maxWidth: ['100%', '100%', '325px'] }}
          type="submit"
          variant="contained"
          startIcon={<VerifiedIcon />}
          fullWidth
        >
          Create Account
        </Button>
      </form>
    </Card>
  );
}

export default CreateAccount;
