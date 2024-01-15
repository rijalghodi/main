import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Main App</title>
        <meta name="description" content="Main App" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
