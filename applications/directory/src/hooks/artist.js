import useSWR, { mutate } from 'swr';
import { useHttpClient } from '@artistdirectory/react-hooks';

const useArtist = (artistId) => {
  const { httpClient } = useHttpClient();

  const { data: artist, error: artistError } = useSWR(
    artistId ? `/artists/${artistId}` : null,
    httpClient.get.bind(httpClient),
    {
      revalidateOnFocus: false
    }
  );
  const artistLoading = !artist && !artistError;

  const saveArtist = async (data) => {
    const isNew = !data._id;
    const url = isNew ? '/artists' : `/artists/${data._id}`;
    let updatedData = null;

    if (isNew) {
      updatedData = await httpClient.post(url, data);
    } else {
      updatedData = await mutate(url, httpClient.put(url, data));
    }

    return updatedData;
  };

  return {
    artist,
    artistError,
    artistLoading,
    saveArtist
  };
};

export default useArtist;
