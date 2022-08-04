// TODO - fix font size in dropdown windows

import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';

const renderMenuItemsList = (items) => {
  return items.map(({ _id, name }) => {
   return  <MenuItem
      key={_id}
      value={name}
      name={name}
      sx={{ minHeight: 0.1, padding: 0.6 }}
    >
      {name}
    </MenuItem>;
  });
};

const Search = ({ categories, tags, skills }) => {
  const [category, setCategory] = useState('');
  const onCategoryChange = (e) => setCategory(e.target.value);

  const [tag, setTag] = useState('');
  const onTagChange = (e) => setTag(e.target.value);

  const [skill, setSkill] = useState('');
  const onSkillChange = (e) => setSkill(e.target.value);

  // style container for dropdown items
  const selectMenuProps = {
    PaperProps: {
      sx: {
        padding: 2,
        '& .MuiList-padding': {
          padding: 0
        }
      }
    }
  };
  return (
    <Box
      sx={{
        display: 'flex',
        typography: 'body2',
        // maxWidth: "40rem",
        justifyContent: 'space-evenly',
        alignItems: 'baseline',
        flexDirection: ['row'],
        flexWrap: ['wrap', 'wrap', 'wrap', 'nowrap'],
        '& .MuiInputBase-root': {
          fontSize: '1rem'
        },
        '& .MuiInputLabel-root': {
          fontSize: '1rem'
        }
      }}
    >
      <FormControl
        sx={{
          margin: ['0 1rem 1rem 0'],
          flex: ['1 100%', '1 30%']
        }}
      >
        <InputLabel>Categories</InputLabel>
        <Select
          label="Categories"
          name="categories"
          value={category}
          onChange={onCategoryChange}
          sx={{
            '& svg': {
              color: 'primary.main'
            }
          }}
          autoWidth
          MenuProps={selectMenuProps}
        >
          {renderMenuItemsList(categories)}
        </Select>
      </FormControl>
      <FormControl
        sx={{
          margin: ['0 1rem 1rem 0'],
          flex: ['1 100%', '1 30%']
        }}
      >
        <InputLabel>Tags</InputLabel>
        <Select
          label="Tags"
          name="tags"
          value={tag}
          onChange={onTagChange}
          sx={{
            '& svg': {
              color: 'primary.main'
            }
          }}
          autoWidth
          MenuProps={selectMenuProps}
        >
          {renderMenuItemsList(tags)}
        </Select>
      </FormControl>
      <FormControl
        sx={{
          margin: ['0 1rem 1rem 0'],
          flex: ['1 100%', '1 30%']
        }}
      >
        <InputLabel>Hireable Skills</InputLabel>
        <Select
          label="Hireable Skills"
          name="skills"
          value={skill}
          onChange={onSkillChange}
          sx={{
            '& svg': {
              color: 'primary.main'
            }
          }}
          autoWidth
          MenuProps={selectMenuProps}
        >
          {renderMenuItemsList(skills)}
        </Select>
      </FormControl>
      <FormControl
        sx={{
          margin: ['0 1rem 1rem 0'],
          flex: ['1 100%', '1 70%']
        }}
      >
        <TextField
          // size="3.4rem"
          InputProps={{
            style: {
              fontSize: ['1rem'],
              width: '100%',
              height: ['3.7rem'],
            },
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
          margin: ['0 1rem 1rem 0'],
          flex: ['1 100%', '1 25%', '1 25%', '1 33%'],
          minHeight: 56,
          display: 'inline-flex',
          alignItems: 'center',
          '& button': {
            height: '2.25rem'
          }
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
