import { useEffect, useState } from 'react';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { SessionProvider, useSession } from 'next-auth/react'; // https://stackoverflow.com/questions/70243476/module-not-found-error-package-path-client-is-not-exported-from-package
import { HttpClientProvider, useCookies } from '@artistdirectory/react-hooks';
import createEmotionCache from '../theme/createEmotionCache';
import theme from '../theme/material';
import '../theme/index.scss';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const RefreshTokenHandler = ({ setInterval }) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      // We did set the token to be ready to refresh after 7 minutes, here we set interval of 7 minutes.
      console.log(session);
      const timeRemaining = Math.round(
        (session.user.accessTokenExpiry - 2 * 60 * 1000 - Date.now()) / 1000
      );
      console.log(timeRemaining);
      setInterval(timeRemaining > 0 ? timeRemaining : 0);
    }
  }, [session, setInterval]);

  return null;
};

const App = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache
}) => {
  const [interval, setInterval] = useState(0);
  const { getCookie } = useCookies();
  console.log(interval);
  // TODO - do I have to use useCallback  here
  // Add the token to each request.
  const httpRequestInterceptor = (config) => {
    // const token = sessionStorage.authToken;
    const accessToken = getCookie('access-token');
    // debugger; // eslint-disable-line

    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  };

  return (
    <CacheProvider value={emotionCache}>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <SessionProvider session={pageProps.session} refetchInterval={interval}>
        <HttpClientProvider
          baseUrl={process.env.DIRECTORY_API_URL}
          requestInterceptor={httpRequestInterceptor}
        >
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
            <RefreshTokenHandler setInterval={setInterval} />
          </ThemeProvider>
        </HttpClientProvider>
      </SessionProvider>
    </CacheProvider>
  );
};

export default App;
