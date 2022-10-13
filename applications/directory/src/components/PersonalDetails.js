import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const renderDetailsList = (list, title, i) => (
  <Box sx={{ flex: 1, marginRight: ['0', '0', '1rem', '1.25rem'] }} key={i}>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '0.25rem'
      }}
    >
      <Box
        component="span"
        sx={{
          minHeight: ['auto', 'auto', '3rem'],
          fontSize: '0.75rem',
          fontWeight: '600',
          lineHeight: '1.33',
          letterSpacing: '0.4px',
          marginTop: '1px',
          color: 'text.secondary'
        }}
      >
        {title}
      </Box>
    </Box>
    <Box>
      <List sx={{ padding: '0', marginBottom: '1.5rem' }}>
        {list.map((item, index) => (
          <ListItem
            key={index}
            sx={{
              display: 'inline-flex',
              // flex: '1',
              width: 'auto',
              padding: '0 0.406rem',
              lineHeight: '1.5',
              letterSpacing: '0.15px'
            }}
          >
            <ListItemText
              primary={item}
              primaryTypographyProps={{ fontSize: ['1rem'], lineHeight: '1.5' }} // using this prop is the only way to change font properties
              sx={{
                textTransform: 'capitalize'
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  </Box>
);

const PersonalDetails = ({ artist }) => {
  const { firstName, description, categories, tags, skills } = artist;
  const keyWordsList = [
    { list: categories, title: 'Type of Artist' },
    { list: tags, title: `10 Words to Describe ${firstName}'s Work` },
    { list: skills, title: `${firstName}' Skills` }
  ];

  return (
    <Card
      sx={{
        marginBottom: '3.125rem',
        color: 'text.primary',
        boxShadow: '-0.625rem 0.625rem 1.25rem 0 rgba(30, 30, 30, 0.05)'
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontSize: '1.25rem',
          fontFamily: 'gira-sans, sans-serif',
          fontWeight: 500,
          marginBottom: '0.875rem'
        }}
      >
        Personal Details
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: ['column', 'column', 'row'],
          borderBottom: 'solid 1px rgba(0, 0, 0, 0.1)',
          marginBottom: '1.984rem'
        }}
      >
        {keyWordsList.map(({ list, title }, index) =>
          renderDetailsList(list, title, index)
        )}
      </Box>
      <Box>
        <Typography
          variant="h2"
          sx={{
            fontSize: '1.25rem',
            fontFamily: 'gira-sans, sans-serif',
            fontWeight: 500,
            marginBottom: '0.875rem',
            whiteSpace: 'pre-line'
          }}
        >
          About {firstName}
        </Typography>
        <Typography
          variant="p"
          component="p"
          sx={{
            margin: '1rem 0',
            fontSize: '1rem',
            lineHeight: '1.5',
            letterSpacing: '0.15px',
            wordBreak: 'break-word',
            textAlign: 'justify'
          }}
        >
          {description}
        </Typography>
      </Box>
    </Card>
  );
};

export default PersonalDetails;
