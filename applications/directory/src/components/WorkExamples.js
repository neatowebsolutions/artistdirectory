import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
// import Thumbnail from './Thumbnail';

function WorkExamples() {
  return (
    <Card
      sx={{
        '& h2': { typography: 'body1', fontSize: '20px', fontWeight: '500' }
      }}
    >
      <h2>Work Examples</h2>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {/* <Thumbnail /> */}
      </Box>
    </Card>
  );
}

export default WorkExamples;
