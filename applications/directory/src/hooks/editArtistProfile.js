import useSWR from 'swr';
import { useHttpClient } from '@artistdirectory/react-hooks';

const useEditProfile = (token) => {
  const { httpClient } = useHttpClient();

  const { data: artist, error } = useSWR(
    `/artists/editProfileToken/${token}`,
    httpClient.get.bind(httpClient),
    {
      revalidateOnFocus: false
    }
  );
  const artistLoading = !artist && !error;
  return {
    artist,
    error,
    artistLoading
  };
};

export default useEditProfile;
