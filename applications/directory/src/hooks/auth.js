import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';

const useAuth = () => {
  const router = useRouter();
  const [authError, setAuthError] = useState();

  const onSubmit = async (email, password) => {
    const res = await signIn('credentials', {
      email,
      password,
      callbackUrl: `${window.location.origin}`,
      redirect: false
    });
    if (res.url) {
      setAuthError('');
      router.push('/');
    }
    if (res.error) setAuthError('An Error occurred. Try again');
  };

  return { onSubmit, authError };
};

export default useAuth;
