import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

function PersonalDetails() {
  return (
    <Card
      sx={{
        mb: '50px',
        '& h2': { typography: 'body1', fontSize: '20px', fontWeight: '500' },
        '& p': {
          margin: '0'
        }
      }}
    >
      <h2>Personal Details</h2>
      <Box
        sx={{
          display: 'flex',
          borderBottom: 'solid 1px rgba(0, 0, 0, 0.1)'
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
                color: 'rgba(0, 0, 0, 0.38)'
              }
            }}
          >
            <span>Type Of Artist</span>
          </Box>
          <p>Musician</p>
          <p>Visual Artist</p>
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
                color: 'rgba(0, 0, 0, 0.38)'
              }
            }}
          >
            <span>10 Words to Describe Josephine’s Work</span>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              maxWidth: '500px',
              '& p': {
                margin: '0 10px 0 0'
              }
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
      <Box
        sx={{
          '& h2': { typography: 'body1', fontSize: '20px', fontWeight: '500' },
          '& p': {
            margin: '1rem 0',
            fontSize: '16px',
            lineHeight: '1.5',
            letterSpacing: '0.15px'
          }
        }}
      >
        <h2>About Josephine</h2>
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
