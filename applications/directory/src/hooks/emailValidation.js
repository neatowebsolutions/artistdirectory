import { useHttpClient } from '@artistdirectory/react-hooks';

const useEmailValidation = () => {
  const { httpClient } = useHttpClient();

  const ifEmailExists = async (email) => {
    try {
      const artist = await httpClient.get(`/profile/email-validity/${email}`);

      return artist; // returns  { profile: true (if profile with given email created), account: false (if account  for existed profile is not created) })
    } catch (error) {
      return {
        error: error.message
      };
    }
  };

  return {
    ifEmailExists
  };
};

export default useEmailValidation;
