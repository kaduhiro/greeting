import { useEffect } from 'react';

import { Roboto_Slab } from '@next/font/google';
import { useRouter } from 'next/router';
import { RecoilRoot } from 'recoil';

import { Gtag, GtagHandler } from '@/libraries/gtag';

import '@/assets/css/globals.css';

import type { AppProps } from 'next/app';

const roboto = Roboto_Slab({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouterChange = (url: any) => {
      GtagHandler(url);
    };

    router.events.on('routeChangeComplete', handleRouterChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouterChange);
    };
  }, [router.events]);

  return (
    <RecoilRoot>
      <Gtag />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
