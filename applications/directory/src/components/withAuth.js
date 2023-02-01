import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';

const withAuth = (Component) => {
  const AuthenticatedComponent = () => {
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
      if (
        session?.error === 'RefreshAccessTokenError' ||
        session?.error === 'AccessTokenNotProvided'
      ) {
        signOut({ callbackUrl: '/auth/login', redirect: false });
      }

      if (session === null) {
        if (router.route !== '/auth/login') {
          router.replace('/auth/login');
        }
      } else if (session !== undefined) {
        if (router.route === '/auth/login') {
          router.replace('/');
        }
      }
    }, [session, router]);

    return session ? <Component session={session} /> : null;
  };

  return AuthenticatedComponent;
};

export default withAuth;
