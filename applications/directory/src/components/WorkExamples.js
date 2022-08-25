import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
// import Thumbnail from './Thumbnail';

function WorkExamples({ images }) {
  return (
    <Card
      sx={{
        '& h2': { typography: 'body1', fontSize: '20px', fontWeight: '500' }
      }}
    >
      <h2>Work Examples</h2>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {images.map((image, index) => (
          <Card
            key={index}
            sx={{
              minHeight: '14rem',
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
