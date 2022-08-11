import useSWR from 'swr';
import { useHttpClient } from '@artistdirectory/react-hooks';

const useArtistByToken = (token) => {
  const { httpClient } = useHttpClient();
  const { data: artist, error } = useSWR(
    `/artists/token/${token}`,
    httpClient.get.bind(httpClient),
    {
      revalidateOnFocus: false,
    }
  );

  //console.log(artist);
  const artistLoading = !artist && !error;
  return {
    artist,
    error,
    artistLoading,
  };
};

export default useArtistByToken;
