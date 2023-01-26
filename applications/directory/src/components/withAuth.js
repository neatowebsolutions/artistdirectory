import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

const withAuth = (Component) => {
  const AuthenticatedComponent = () => {
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
      if (!session) {
        router.replace('/auth/login');
      }
    }, [router, session]);

    return session ? <Component session={session} /> : null;
  };

  return AuthenticatedComponent;
};

export default withAuth;
