import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme/material';
import '../theme/index.scss';

const App = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <link rel="stylesheet" href="https://use.typekit.net/rih6hbv.css" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
    </Head>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  </>
);

export default App;
