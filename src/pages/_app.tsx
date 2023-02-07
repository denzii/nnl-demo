import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { pageview } from '@/lib/ga'

import GlobalStyle from '@/style/global.style'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = (url:string) => {
      pageview(url);
    };

    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return <>
    <GlobalStyle />
    <Component {...pageProps} />
  </>
}
