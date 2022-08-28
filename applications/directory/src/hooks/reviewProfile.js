import { useHttpClient } from '@artistdirectory/react-hooks';

const useReviewProfile = () => {
  const { httpClient } = useHttpClient();

  const reviewArtistProfile = async (reviewToken, values) => {
    try {
      await httpClient.patch(`/reviews/token/${reviewToken}`, values);
      return {
        data: 'Profile reviewed successfully'
      };
    } catch (error) {
      return {
        error: error.message
      };
    }
  };

  return {
    reviewArtistProfile
  };
};

export default useReviewProfile;
