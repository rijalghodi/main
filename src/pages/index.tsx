import Image from "next/image";
// import { Inter } from "next/font/google";
import dynamic from "next/dynamic";

const Expose = dynamic(() => import("child/Expose"), {
  ssr: false,
});

import React, { lazy, useState } from "react";

// const PlusButton = lazy(() => import("child/PlusButton"));
// const Dashboard = lazy(() =>
//   window.next2.get("./dashboard").then((dashboard) => {
//     return { default: dashboard() };
//   })
// );
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AppProps } from "next/app";

// This call would be wrapped in your form component and bound to your login or submit button

export default function Home(props: AppProps) {
  const session = useSession();
  const router = useRouter();
  const handleSignIn = async () => {
    signIn("credentials", {
      email: "ahahah",
      password: "123",
    });
  };
  const handleSignOut = async () => {
    signOut();
  };

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 32,
        height: "100vh",
        padding: 32,
        overflow: "hidden",
      }}
    >
      <h1 className="text-xl text-center">Aplikasi Main</h1>
      <Link href="/dashboard">Go to dashboard</Link>
      <div style={{ display: "flex", gap: 24 }}>
        <p>Current Session:</p>
        <pre>{JSON.stringify(session)}</pre>
      </div>
      <div>
        <div style={{ display: "flex", gap: 24 }}>
          <button onClick={handleSignIn}>Sign In</button>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      </div>
      <div>
        <h1>Child Content</h1>
        {/* <SessionProvider session={props.pageProps?.session}> */}
        <Expose />
        {/* </SessionProvider> */}
      </div>
    </main>
  );
}
