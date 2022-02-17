import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";

const renderMenuItemsList = (items, error, loading) => {
  if (error) return <MenuItem>Failed to fetch options</MenuItem>;
  if (loading) return <MenuItem>Loading...</MenuItem>;
  return items.map(({ _id, name }) => (
    <MenuItem
      key={_id}
      value={name}
      name={name}
      sx={{ minHeight: 0.1, p: 0.6 }}
    >
      {name}
    </MenuItem>
  ));
};

const Search = ({
  categories: { categories, categoriesError, categoriesLoading },
  tags: { tags, tagsError, tagsLoading },
  skills: { skills, skillsError, skillsLoading },
}) => {
  const [category, setCategory] = useState("");
  const onCategoryChange = (e) => setCategory(e.target.value);

  const [tag, setTag] = useState("");
  const onTagChange = (e) => setTag(e.target.value);

  const [skill, setSkill] = useState("");
  const onSkillChange = (e) => setSkill(e.target.value);

  // style container for dropdown items
  const selectMenuProps = {
    PaperProps: {
      sx: {
        padding: 2,
        "& .MuiList-padding": {
          padding: 0
        }
      }
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        flexDirection: ["column", "column", "row", "row"],
      }}
    >
      <FormControl sx={{ mr: [0, 0, 1], mb: [3, 3, 0], flex: 1 }}>
        <InputLabel>Categories</InputLabel>
        <Select
          label="Categories"
          name="categories"
          value={category}
          onChange={onCategoryChange}
          sx={{
            "& svg": {
              color: "primary.main",
            }
          }}
          autoWidth
          MenuProps={selectMenuProps}
        >
          {renderMenuItemsList(categories, categoriesError, categoriesLoading)}
        </Select>
      </FormControl>
      <FormControl sx={{ mx: [0, 0, 1], mb: [3, 3, 0], flex: 1 }}>
        <InputLabel>Tags</InputLabel>
        <Select
          label="Tags"
          name="tags"
          value={tag}
          onChange={onTagChange}
          sx={{
            "& svg": {
              color: "primary.main",
            }
          }}
          autoWidth
          MenuProps={selectMenuProps}
        >
          {renderMenuItemsList(tags, tagsError, tagsLoading)}
        </Select>
      </FormControl>
      <FormControl sx={{ mx: [0, 0, 1], mb: [3, 3, 0], flex: 1 }}>
        <InputLabel>Hireable Skills</InputLabel>
        <Select
          label="Hireable Skills"
          name="skills"
          value={skill}
          onChange={onSkillChange}
          sx={{
            "& svg": {
              color: "primary.main",
            },
          }}
          autoWidth
          MenuProps={selectMenuProps}
        >
          {renderMenuItemsList(skills, skillsError, skillsLoading)}
        </Select>
      </FormControl>
      <FormControl sx={{ mx: [0, 0, 1], mb: [3, 3, 0], flex: 2 }}>
        <TextField
          InputProps={{
            style: { fontSize: ".95rem" },
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
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
          display: "inline-flex",
          alignItems: "center",
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
