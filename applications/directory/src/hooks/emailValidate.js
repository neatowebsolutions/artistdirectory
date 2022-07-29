import { useHttpClient } from '@artistdirectory/react-hooks';

const useEmailValidate = () => {
  const { httpClient } = useHttpClient();

  const ifEmailExists = async (email) => {
    try {
      const validEmail = await httpClient.get(
        `/profile/email-validity/${email}`
      );
      return {
        validEmail: !validEmail, // returns 'true' if an artist with provided email address not found
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  };

  return {
    ifEmailExists,
  };
};

export default useEmailValidate;
