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
      return {
        error: error.message
      };
    }
  };

  return {
    createArtist
  };
};

export default useCreateArtist;
