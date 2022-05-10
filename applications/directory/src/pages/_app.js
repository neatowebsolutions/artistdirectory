import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { HttpClientProvider, HttpClient } from '@artistdirectory/react-hooks';
import createEmotionCache from '../theme/createEmotionCache';

import theme from '../theme/material';

import '../theme/index.scss';

const httpClient = new HttpClient({
  baseUrl: process.env.DIRECTORY_API_URL
});

// Add the token to each request.
httpClient.addRequestInterceptor((config) => {
  const token = sessionStorage.authToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const App = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache
}) => (
  <CacheProvider value={emotionCache}>
    <meta name="viewport" content="initial-scale=1, width=device-width" />
    <HttpClientProvider httpClient={httpClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </HttpClientProvider>
  </CacheProvider>
);

export default App;
