import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';

const useAuth = () => {
  const router = useRouter();
  const [authError, setAuthError] = useState(null);

  const onSubmit = async (email, password, isNew = false) => {
    const res = await signIn('credentials', {
      email,
      password,
      isNew,
      callbackUrl: `${window.location.origin}`,
      redirect: false
    });
    if (res.url) {
      setAuthError(null);
      router.push('/');
    }

    if (res.error) {
      setAuthError(
        res.status === 401
          ? ' Wrong email or password. Try again'
          : 'An Error occurred. Try again later'
      );
    }
  };

  return { onSubmit, authError };
};

export default useAuth;
