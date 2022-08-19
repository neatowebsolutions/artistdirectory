import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const renderDetailsList = (list, title) => (
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
      <span>{title}</span>
    </Box>
    <List>
      {list.map((item, index) => (
        <ListItem key={index}>
          <ListItemText primary={item} />
        </ListItem>
      ))}
    </List>
  </Box>
);

const PersonalDetails = ({ artist }) => {
  const { firstName, description, categories, tags, skills } = artist;
  const keyWordsList = [
    { list: categories, title: 'Type of Artist' },
    { list: tags, title: `10 Words to Describe ${firstName}'s Work` },
    { list: skills, title: `${firstName}' Skills` },
  ];

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
        {keyWordsList.map(({ list, title }) => renderDetailsList(list, title))}
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
};

export default PersonalDetails;
