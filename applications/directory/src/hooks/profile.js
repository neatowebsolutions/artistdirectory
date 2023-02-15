import useSWR from 'swr';
import { useHttpClient } from '@artistdirectory/react-hooks';

const useProfile = () => {
  const { httpClient } = useHttpClient();

  const { data: profile, error: profileError } = useSWR(
    `/profile`,
    httpClient.get.bind(httpClient),
    {
      revalidateOnFocus: false
    }
  );
  const profileLoading = !profile && !profileError;
  return {
    profile,
    profileError,
    profileLoading
  };
};

export default useProfile;
