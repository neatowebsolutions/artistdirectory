import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const RouteGuard = ({ children }) => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace('/auth/login');
    }
  });
  if (status === 'loading') return null;

  if (status === 'authenticated' && session) {
    return children;
  }
  return children;
};

export default RouteGuard;
