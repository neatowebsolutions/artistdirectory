import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function PersonalDetails({
  artist: { firstName, description, skills, categories },
}) {
  return (
    <Card
      sx={{
        mb: '50px',
        '& h2': { typography: 'body1', fontSize: '20px', fontWeight: '500' },
        '& p': {
          margin: '0',
        },
      }}
    >
      <h2>Personal Details</h2>
      <Box
        sx={{
          display: 'flex',
          borderBottom: 'solid 1px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box sx={{ flex: 1, mr: '20px' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: '10px',
              '& span': {
                fontSize: '12px',
                fontWeight: '500',
                lineHeight: '1.33',
                letterSpacing: '0.4px',
                mt: '1px',
                color: 'rgba(0, 0, 0, 0.38)',
              },
            }}
          >
            <span>Type Of Artist</span>
          </Box>
          <List>
            {categories.map((category) => (
              <ListItem key={category}>
                <ListItemText primary={category} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box sx={{ flex: 4, mb: '20px' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: '10px',
              '& span': {
                fontSize: '12px',
                fontWeight: '500',
                lineHeight: '1.33',
                letterSpacing: '0.4px',
                mt: '1px',
                color: 'rgba(0, 0, 0, 0.38)',
              },
            }}
          >
            <span>10 Words to Describe {firstName}’s Work</span>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              maxWidth: '500px',
              '& p': {
                margin: '0 10px 0 0',
              },
            }}
          >
            <List>
              {skills.map((skill) => (
                <ListItem key={skill}>
                  <ListItemText primary={skill} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          '& h2': { typography: 'body1', fontSize: '20px', fontWeight: '500' },
          '& p': {
            margin: '1rem 0',
            fontSize: '16px',
            lineHeight: '1.5',
            letterSpacing: '0.15px',
          },
        }}
      >
        <h2>About {firstName}</h2>
        <p>{description}</p>
      </Box>
    </Card>
  );
}

export default PersonalDetails;
