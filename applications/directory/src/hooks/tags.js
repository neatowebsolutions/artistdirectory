import useSWR from 'swr';
import { useHttpClient } from '@artistdirectory/react-hooks';

const useTags = () => {
  const { httpClient } = useHttpClient();

  const { data: tags, error: tagsError } = useSWR(
    `/tags`,
    httpClient.get.bind(httpClient),
    {
      revalidateOnFocus: false
    }
  );
  const tagsLoading = !tags && !tagsError;

  return {
    tags,
    tagsLoading,
    tagsError
  };
};

export default useTags;
