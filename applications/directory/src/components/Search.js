import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import classes from './Search.module.scss';

const Search = () => {
  const [categories, setCategories] = useState('');
  const [tags, setTags] = useState('');
  const [skills, setSkills] = useState('');

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
        flexDirection: ['column', 'column', 'row', 'row']
      }}
    >
      <FormControl sx={{ mr: 1, flex: 2 }}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          variant="outlined"
        />
        <InputLabel sx={{ marginLeft: 4 }}>
          Search for artists, writers, musicians, etc.
        </InputLabel>
      </FormControl>
      <FormControl sx={{ mx: 1, flex: 1 }}>
        <InputLabel>Categories</InputLabel>
        <Select
          value={categories}
          label="Categories"
          inputProps={{
            classes: {
              icon: classes.icon
            }
          }}
          autoWidth
        >
          <MenuItem></MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ mx: 1, flex: 1 }}>
        <InputLabel>Tags</InputLabel>
        <Select
          value={tags}
          label="Tags"
          inputProps={{
            classes: {
              icon: classes.icon
            }
          }}
          autoWidth
        >
          <MenuItem></MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ mx: 1, flex: 1 }}>
        <InputLabel>Hireable Skills</InputLabel>
        <Select
          value={skills}
          label="Hireable Skills"
          inputProps={{
            classes: {
              icon: classes.icon
            }
          }}
          autoWidth
        >
          <MenuItem></MenuItem>
        </Select>
      </FormControl>
      <Box
        sx={{
          ml: 1,
          flex: 1,
          minHeight: 56,
          display: 'inline-flex',
          alignItems: 'center'
        }}
      >
        <Button style={{ width: '100%' }} variant="contained" disableElevation>
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default Search;
