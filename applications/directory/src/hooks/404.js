// TODO - fix - when an artist is not found before the page is redirected to 404 - it shows Alert with an error message
import { useEffect } from 'react';
import Router from 'next/router'; // using the global router (Router.replace("404") inside the useEffect without having a dependency to useRouter or needing a router instance)

const use404 = (error) => {
  useEffect(() => {
    if (error?.statusCode === 404) {
      // redirect to 404 - not found page
      Router.replace('/404');
    }
  }, [error]);
};

export default use404;
