import { useHttpClient } from '@artistdirectory/react-hooks';

const useCreateArtist = () => {
  const { httpClient } = useHttpClient();

  const createArtist = async (data) => {
    try {
      await httpClient.post('/artists', data);
      return {
        data: 'Artist has been created'
      };
    } catch (error) {
      throw new Error(error);
    }
  };

  return {
    createArtist
  };
};

export default useCreateArtist;
