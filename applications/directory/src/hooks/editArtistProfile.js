import useSWR from 'swr';
import { useHttpClient } from '@artistdirectory/react-hooks';

const useEditProfile = (token) => {
  const { httpClient } = useHttpClient();

  const { data: artist, error: artistError } = useSWR(
    `/artists/edit-profile-token/${token}`,
    httpClient.get.bind(httpClient),
    {
      revalidateOnFocus: false
    }
  );
  const artistLoading = !artist && !artistError;
  return {
    artist,
    artistError,
    artistLoading
  };
};

export default useEditProfile;
