import useSWR from 'swr';
import { useHttpClient } from '@artistdirectory/react-hooks';

const useReview = (token) => {
  const { httpClient } = useHttpClient();

  const { data: artist, error } = useSWR(
    `/artists/token/${token}`,
    httpClient.get.bind(httpClient),
    {
      revalidateOnFocus: false
    }
  );
  const artistLoading = !artist && !error;

  const updateReview = async (values) => {
    try {
      await httpClient.patch(`/reviews/token/${token}`, values);
      return {
        data: 'Artist profile reviewed successfully'
      };
    } catch (err) {
      console.log(err);
      throw new Error('Server error reviewing artist profile');
    }
  };

  return {
    artist,
    error,
    artistLoading,
    updateReview
  };
};

export default useReview;
