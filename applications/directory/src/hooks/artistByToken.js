import useSWR from 'swr';
import { useHttpClient } from '@artistdirectory/react-hooks';

const useArtistByToken = async (token) => {
  const { httpClient } = useHttpClient();

  const { data: artist, error } = useSWR(
    `/artists/token/${token}`,
    httpClient.get.bind(httpClient),
    {
      revalidateOnFocus: false,
    }
  );
  console.log(artist);

  return {
    artist,
    error,
  };
};

export default useArtistByToken;
