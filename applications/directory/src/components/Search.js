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

const renderMenuItems = (items, error, loading) => {
  if (error) return <MenuItem>Failed to fetch options</MenuItem>;
  if (loading) return <MenuItem>Loading...</MenuItem>;

  const itemsToRender = items.map(({ _id, name }) => (
    <MenuItem
      key={_id}
      value={name}
      name={name}
      sx={{ minHeight: 0.1, p: 0.6 }}
    >
      {name}
    </MenuItem>
  ));

  return itemsToRender;
};

const Search = ({
  allCategories: { categories, categoriesError, categoriesLoading },
  allTags: { tags, tagsError, tagsLoading },
  allSkills: { skills, skillsError, skillsLoading },
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
      // https://stackoverflow.com/questions/50353676/style-the-dropdown-element-of-mui-select
      sx: {
        padding: 2,
        "& .MuiList-padding": {
          padding: 0,
        },
      },
    },
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-evenly",
        flexDirection: ["column", "column", "row", "row"],
      }}
    >
      {/* <Test /> */}

      <FormControl sx={{ mr: [0, 0, 1], mb: [3, 3, 0], flex: 1 }}>
        <InputLabel>Categories</InputLabel>
        <Select
          value={category}
          label="Categories"
          onChange={onCategoryChange}
          autoWidth
          name="categories"
          sx={{
            "& svg": {
              color: "primary.main",
            },
          }}
          MenuProps={selectMenuProps}
        >
          {renderMenuItems(categories, categoriesError, categoriesLoading)}
        </Select>
      </FormControl>
      <FormControl sx={{ mx: [0, 0, 1], mb: [3, 3, 0], flex: 1 }}>
        <InputLabel>Tags</InputLabel>
        <Select
          value={tag}
          label="Tags"
          name="tags"
          sx={{
            "& svg": {
              color: "primary.main",
            },
          }}
          autoWidth
          onChange={onTagChange}
          MenuProps={selectMenuProps}
        >
          {renderMenuItems(tags, tagsError, tagsLoading)}
        </Select>
      </FormControl>
      <FormControl sx={{ mx: [0, 0, 1], mb: [3, 3, 0], flex: 1 }}>
        <InputLabel>Hireable Skills</InputLabel>
        <Select
          // value={skills}
          label="Hireable Skills"
          value={skill}
          name="skills"
          sx={{
            "& svg": {
              color: "primary.main",
            },
          }}
          autoWidth
          onChange={onSkillChange}
          MenuProps={selectMenuProps}
        >
          {renderMenuItems(skills, skillsError, skillsLoading)}
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

// import { useState } from "react";
// import SearchIcon from "@mui/icons-material/Search";
// import TextField from "@mui/material/TextField";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Box from "@mui/material/Box";
// import Select from "@mui/material/Select";
// import InputAdornment from "@mui/material/InputAdornment";
// import Button from "@mui/material/Button";

// import { useDropdown, useCategories, useTags } from "../hooks";

// const renderMenuItems = (items, error, loading) => {
//   if (error) return <div>Some error</div>;
//   if (loading) return <div>Loading...</div>;

//   const itemsToRender = items.map((item) => (
//     <MenuItem key={item._id} value={item.name} sx={{ minHeight: 1 }}>
//       {item.name}
//     </MenuItem>
//   ));

//   return itemsToRender;
// };

// const Search = ({
//   allCategories: { categories, categoriesError, categoriesLoading },
//   allTags: { tags, tagsError, tagsLoading },
// }) => {
//   const [category, setCategory] = useState("");
//   const [tag, setTag] = useState("");
//   const handleChange = (e) => setCategory(e.target.value);
//   // const [tags, setTags] = useState('');
//   // const [skills, setSkills] = useState('');
//   // const { categories, categoriesLoading, categoriesError } = useCategories();
//   const { tags, tagsLoading, tagsError } = useTags();
//   // const {
//   //   data: tags,
//   //   error: tagsError,
//   //   dataLoading: tagsLoading,
//   // } = useDropdown("tags");

//   // console.log(tags, tagsError, tagsLoading)

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         justifyContent: "space-evenly",
//         flexDirection: ["column", "column", "row", "row"],
//       }}
//     >
//       {/* <Test /> */}

//       <FormControl sx={{ mr: [0, 0, 1], mb: [3, 3, 0], flex: 1 }}>
//         <InputLabel>Categories</InputLabel>
//         <Select
//           value={category}
//           label="Categories"
//           onChange={handleChange}
//           autoWidth
//           sx={{
//             "& svg": {
//               color: "primary.main",
//             },
//           }}
//         >
//           {renderMenuItems(categories, categoriesError, categoriesLoading)}
//         </Select>
//       </FormControl>
//       <FormControl sx={{ mx: [0, 0, 1], mb: [3, 3, 0], flex: 1 }}>
//         <InputLabel>Tags</InputLabel>
//         <Select
//           // value={tags}
//           label="Tags"
//           sx={{
//             "& svg": {
//               color: "primary.main",
//             },
//           }}
//           autoWidth
//         >
//           {renderMenuItems(tags, tagsError, tagsLoading)}
//         </Select>
//       </FormControl>
//       <FormControl sx={{ mx: [0, 0, 1], mb: [3, 3, 0], flex: 1 }}>
//         <InputLabel>Hireable Skills</InputLabel>
//         <Select
//           // value={skills}
//           label="Hireable Skills"
//           sx={{
//             "& svg": {
//               color: "primary.main",
//             },
//           }}
//           autoWidth
//         >
//           <MenuItem></MenuItem>
//         </Select>
//       </FormControl>
//       <FormControl sx={{ mx: [0, 0, 1], mb: [3, 3, 0], flex: 2 }}>
//         <TextField
//           InputProps={{
//             style: { fontSize: ".95rem" },
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//           variant="outlined"
//           placeholder="Search for artists, writers, musicians, etc."
//         />
//       </FormControl>
//       <Box
//         sx={{
//           mx: [0, 0, 1],
//           flex: 1,
//           minHeight: 56,
//           display: "inline-flex",
//           alignItems: "center",
//         }}
//       >
//         <Button fullWidth variant="contained">
//           Search
//         </Button>
//       </Box>
//     </Box>
//   );
// };

// export default Search;
