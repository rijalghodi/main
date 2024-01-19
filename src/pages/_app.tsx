import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

export default function App({ Component, pageProps }: AppProps) {
  const client = new ApolloClient({
    uri: "https://api.dashboard.modules.dev.optimining.optimap.id/graphql",
    // uri: "https://fakeurl/graphql", // CHILD WILL GOT ERROR
    cache: new InMemoryCache(),
  });
  return (
    <>
      <Head>
        <title>Main App</title>
        <meta name="description" content="Main App" />
      </Head>
      {/* <ApolloProvider client={client}> */}
      <Component {...pageProps} />
      {/* </ApolloProvider> */}
    </>
  );
}
