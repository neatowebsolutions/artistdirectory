import useSWR from "swr";
import { useHttpClient } from "@artistdirectory/react-hooks";

const useDropdown = (path) => {
  const { httpClient } = useHttpClient();

  const { data, error } = useSWR(path, httpClient.get.bind(httpClient), {
    revalidateOnFocus: false,
  });

  const dataLoading = !data && !error;

  return {
    data,
    error,
    dataLoading,
  };
};

export default useDropdown;
