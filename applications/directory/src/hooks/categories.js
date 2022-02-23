import useSWR from "swr";
import { useHttpClient } from "@artistdirectory/react-hooks";

const useCategories = () => {
  const { httpClient } = useHttpClient();

  const { data: categories, error: categoriesError } = useSWR(
    `/categories`,
    httpClient.get.bind(httpClient),
    {
      revalidateOnFocus: false
    }
  );
  const categoriesLoading = !categories && !categoriesError;

  return {
    categories,
    categoriesLoading,
    categoriesError
  };
};

export default useCategories;
