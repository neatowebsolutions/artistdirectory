import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
// import Thumbnail from './Thumbnail';

function WorkExamples({ images }) {
  return (
    <Card
      sx={{
        marginBottom: '3.125rem'
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
        Work Examples
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: [
            'repeat(2, 1fr)',
            'repeat(2, 1fr)',
            'repeat(3, 1fr)'
          ]
        }}
      >
        {images.map((image, index) => (
          <Card
            key={index}
            sx={{
              minHeight: ['14rem'],
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 0,
              borderRadius: '10px',
              '& img': {
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                // atl styling
                fontSize: '0.875rem',
                margin: '0 1rem'
              }
            }}
            elevation={2}
          >
            <img src={image} alt="work-example" />
          </Card>
        ))}
      </Box>
    </Card>
  );
}

export default WorkExamples;
