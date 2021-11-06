import Head from 'next/head';
import '../theme/index.scss';

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="stylesheet" href="https://use.typekit.net/rih6hbv.css" />
        <link rel="stylesheet" href="https://use.typekit.net/rih6hbv.css" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
