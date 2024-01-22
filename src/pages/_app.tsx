import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const client = new ApolloClient({
    uri: "https://api.dashboard.modules.dev.optimining.optimap.id/graphql",
    // uri: "https://fakeurl/graphql", // CHILD WILL GOT ERROR
    cache: new InMemoryCache(),
  });
  return (
    <>
      <Head>
        <title>Main</title>
        <meta name="description" content="Main" />
      </Head>
      {/* <ApolloProvider client={client}> */}
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
      {/* </ApolloProvider> */}
    </>
  );
}
