import useSWR from 'swr';
import { useHttpClient } from '@artistdirectory/react-hooks';

const useRejectedArtist = (token) => {
  const { httpClient } = useHttpClient();

  const { data: artist, error: artistError } = useSWR(
    token ? `/artists/edit-profile-token/${token}` : null,
    httpClient.get.bind(httpClient),
    {
      revalidateOnFocus: false
    }
  );
  const artistLoading = !artist && !artistError;

  const saveRejectedArtist = async (data, editProfileToken) => {
    return await httpClient.patch(
      `/artists/edit-profile-token/${editProfileToken}`,
      data
    );
  };

  return {
    artist,
    artistError,
    artistLoading,
    saveRejectedArtist
  };
};

export default useRejectedArtist;
