import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Thumbnail from './Thumbnail';
import classes from './WorkExamples.module.scss';

function WorkExamples() {
  return (
    <Card className={classes.workExamples}>
      <h2>Work Examples</h2>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <Thumbnail />
      </Box>
    </Card>
  );
}

export default WorkExamples;
