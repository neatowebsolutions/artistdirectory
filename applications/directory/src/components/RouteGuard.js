import { useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useCookies } from '@artistdirectory/react-hooks';
// https://blog.logrocket.com/building-authentication-api-nextauth-js/
const RouteGuard = ({ children }) => {
  const router = useRouter();
  const { data: session, status } = useSession({});
  const { removeCookie } = useCookies();
  useEffect(() => {
    console.log(session);
    if (session?.error === 'RefreshAccessTokenError') {
      removeCookie('access-token');
      signOut({ callbackUrl: '/auth/login', redirect: true });
    }

    if (session === null) {
      if (router.route !== '/auth/login') {
        router.replace('/auth/login');
      }
    } else if (session !== undefined) {
      if (router.route === '/auth/login') {
        router.replace('/');
      }
    } else if (session && session.accessToken === undefined) {
      // does not work
      console.log('Why not log out)');
      removeCookie('access-token');
      signOut();
    }
  }, [session, router, removeCookie]);

  if (status === 'loading') return null;

  if (status === 'authenticated' && session) {
    return children;
  }
  return children;
};

export default RouteGuard;
