const fetcher = async (url) => {
  const response = await fetch(`${process.env.DIRECTORY_API_URL}/${url}`);
  const json = await response.json();

  return json;
};

export default fetcher;
