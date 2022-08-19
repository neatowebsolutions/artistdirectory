import { useHttpClient } from '@artistdirectory/react-hooks';

const useReviewProfile = () => {
  const { httpClient } = useHttpClient();

  const reviewArtistProfile = async (reviewToken, values) => {
    try {
      const artist = await httpClient.patch(
        `/reviews/token/${reviewToken}`,
        values
      );
      return {
        artist,
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  };

  return {
    reviewArtistProfile,
  };
};

export default useReviewProfile;
