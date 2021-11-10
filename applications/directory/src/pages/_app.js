import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../theme/createEmotionCache';
import theme from '../theme/material';
import '../theme/index.scss';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
// Done restyling
const App = ({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache
}) => (
  <CacheProvider value={emotionCache}>
    <meta name="viewport" content="initial-scale=1, width=device-width" />

    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  </CacheProvider>
);

export default App;
