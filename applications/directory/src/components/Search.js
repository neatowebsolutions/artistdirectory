// import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';

const Search = () => {
  // const [categories, setCategories] = useState('');
  // const [tags, setTags] = useState('');
  // const [skills, setSkills] = useState('');
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
        flexDirection: ['column', 'column', 'row', 'row']
      }}
    >
      <FormControl sx={{ mr: [0, 0, 1], mb: [3, 3, 0], flex: 1 }}>
        <InputLabel>Categories</InputLabel>
        <Select
          // value={categories}
          label="Categories"
          autoWidth
          sx={{
            '& svg': {
              color: 'primary.main'
            }
          }}
        >
          <MenuItem></MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ mx: [0, 0, 1], mb: [3, 3, 0], flex: 1 }}>
        <InputLabel>Tags</InputLabel>
        <Select
          // value={tags}
          label="Tags"
          sx={{
            '& svg': {
              color: 'primary.main'
            }
          }}
          autoWidth
        >
          <MenuItem></MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ mx: [0, 0, 1], mb: [3, 3, 0], flex: 1 }}>
        <InputLabel>Hireable Skills</InputLabel>
        <Select
          // value={skills}
          label="Hireable Skills"
          sx={{
            '& svg': {
              color: 'primary.main'
            }
          }}
          autoWidth
        >
          <MenuItem></MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ mx: [0, 0, 1], mb: [3, 3, 0], flex: 2 }}>
        <TextField
          InputProps={{
            style: { fontSize: '.95rem' },
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          variant="outlined"
          placeholder="Search for artists, writers, musicians, etc."
        />
      </FormControl>
      <Box
        sx={{
          mx: [0, 0, 1],
          flex: 1,
          minHeight: 56,
          display: 'inline-flex',
          alignItems: 'center'
        }}
      >
        <Button fullWidth variant="contained">
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default Search;
