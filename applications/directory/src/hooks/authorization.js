import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function useAuthorization(shouldRedirect) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signOut({ callbackUrl: '/auth/login', redirect: shouldRedirect });
    }

    if (session === null) {
      if (router.route !== '/auth/login') {
        router.replace('/auth/login');
      }
      setIsAuthorized(false);
    } else if (session !== undefined) {
      if (router.route === '/auth/login') {
        router.replace('/');
      }
      setIsAuthorized(true);
    }
  }, [session, shouldRedirect, router]);

  return isAuthorized;
}
