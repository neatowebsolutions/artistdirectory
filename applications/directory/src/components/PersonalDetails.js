import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import classes from './PersonalDetails.module.scss';

function PersonalDetails() {
  return (
    <Card className={classes.personalDetails}>
      <h2 className="cardTitle">Personal Details</h2>
      <Box
        sx={{
          display: 'flex',
          borderBottom: 'solid 1px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Box className={classes.detail} sx={{ flex: 1 }}>
          <Box className={classes.label}>
            <span>Type Of Artist</span>
          </Box>
          <p>Musician</p>
          <p>Visual Artist</p>
        </Box>
        <Box className={classes.detail} sx={{ flex: 4, marginBottom: '20px' }}>
          <Box className={classes.label}>
            <span>10 Words to Describe Josephine’s Work</span>
          </Box>
          <Box
            className={classes.keyWords}
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              maxWidth: '500px'
            }}
          >
            <p>WordOne</p>
            <p>WordTwo</p>
            <p>WordThree</p>
            <p>WordFour</p>
            <p>WordFive</p>
            <p>WordSix</p>
            <p>WordSeven</p>
            <p>WordEight</p>
            <p>WordNine</p>
            <p>WordTen</p>
          </Box>
        </Box>
      </Box>
      <Box className={classes.about}>
        <h2 className="cardTitle">About Josephine</h2>
        <p>
          Josephine is a Grand Rapidian painter, sculptor and printmaker, noted
          for his work in the areas of minimalism and post-painterly
          abstraction. Josephine lives and works in Midtown, GR. She believes
          that abstraction doesn’t have to be limited to a kind of rectilinear
          geometry or even a simple curve geometry; it can have a geometry that
          had a narrative impact. In other words, you can tell a story with the
          shapes and interaction of the shapes and colors would give you a
          narrative sense. Her work is on display at Madcap Coffee, and for sale
          at The Lantern.
        </p>
      </Box>
    </Card>
  );
}

export default PersonalDetails;
