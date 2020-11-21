import React, { ReactFragment } from 'react';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import { GlobalStyle } from 'styles/globalStyles';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
