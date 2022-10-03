import { useHttpClient } from '@artistdirectory/react-hooks';

const useUpdateNewArtist = () => {
  const { httpClient } = useHttpClient();

  const updateNewArtist = async (data, editProfileToken) => {
    try {
      await httpClient.patch(
        `/artists/edit-profile-token/${editProfileToken}`,
        data
      );
      return {
        data: 'Artist has been updated' // TODO - what should be returned here
      };
    } catch (error) {
      throw new Error(error);
    }
  };

  return {
    updateNewArtist
  };
};

export default useUpdateNewArtist;
