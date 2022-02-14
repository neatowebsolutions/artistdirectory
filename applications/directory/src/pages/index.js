import Head from "next/head";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { Layout, Search } from "../components";

import { useCategories, useTags, useSkills } from "../hooks";

const HomePage = () => {
  const { categories, categoriesLoading, categoriesError } = useCategories();
  const { tags, tagsLoading, tagsError } = useTags();
  const { skills, skillsLoading, skillsError } = useSkills();
  
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Layout>
        <Layout.Intro>
          <Box
            sx={{
              typography: "body2",
              lineHeight: [1, 1.5],
              fontSize: "3.75rem",
              fontWeight: "bold",
              letterSpacing: "-0.5px",
              margin: "3rem auto 1.5rem auto",
            }}
          >
            Discover artists and their work,
            <br /> all in one place.
          </Box>
          <Box
            sx={{
              "& p": {
                fontSize: "1.5rem",
                margin: "0 auto",
              },
            }}
          >
            <p>
              Whether you’re looking to purchase artwork, hire an artist, or
              collaborate, this is the place to start.
            </p>
          </Box>
        </Layout.Intro>
        <Card elevation={6}>
          <Search
            allCategories={{ categories, categoriesError, categoriesLoading }}
            allTags={{ tags, tagsError, tagsLoading }}
            allSkills={{ skills, skillsError, skillsLoading }}
          />
        </Card>
      </Layout>
    </>
  );
};

export default HomePage;
