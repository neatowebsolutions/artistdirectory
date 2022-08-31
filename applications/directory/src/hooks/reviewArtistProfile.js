import useSWR from 'swr';
import { useHttpClient } from '@artistdirectory/react-hooks';

const useReview = (token) => {
  const { httpClient } = useHttpClient();

  const { data: artist, error } = useSWR(
    `/artists/review-token/${token}`,
    httpClient.get.bind(httpClient),
    {
      revalidateOnFocus: false
    }
  );

  const artistLoading = !artist && !error;

  const updateReview = async (values) => {
    return await httpClient.patch(`/reviews/token/${token}`, values);
  };

  return {
    artist,
    error,
    artistLoading,
    updateReview
  };
};

export default useReview;
