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
    <div className={classes.search}>
      <FormControl sx={{ m: 1, minWidth: 450 }}>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
          variant="outlined"
        ></TextField>
        <InputLabel sx={{ marginLeft: 5 }}>
          Search for artists, writers, musicians, etc.
        </InputLabel>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 200 }}>
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
      <FormControl sx={{ m: 1, minWidth: 200 }}>
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
      <FormControl sx={{ m: 1, minWidth: 200 }}>
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
          m: 1,
          minWidth: 200,
          minHeight: 56,
          display: 'inline-flex',
          alignItems: 'center'
        }}
      >
        <Button style={{ width: '100%' }} variant="contained" disableElevation>
          Search
        </Button>
      </Box>
    </div>
  );
};

export default Search;
