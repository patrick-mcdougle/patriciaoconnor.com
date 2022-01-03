import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import '../src/index.scss';
import { IsMobileContextProvider } from '../src/contexts/IsMobileContext';
import { GalleryTimerContextProvider } from '../src/contexts/GalleryTimerContext';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GalleryTimerContextProvider>
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/ldb8jwr.css" />
      </Head>
      <IsMobileContextProvider>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </IsMobileContextProvider>
    </GalleryTimerContextProvider>
  );
}
