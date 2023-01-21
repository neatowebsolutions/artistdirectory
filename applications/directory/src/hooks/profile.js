import useSWR from 'swr';
import { useHttpClient } from '@artistdirectory/react-hooks';
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';

const useProfile = () => {
  const { data } = useSession();
  console.log(data);

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
