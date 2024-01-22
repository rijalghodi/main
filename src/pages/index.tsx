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
import { SessionProvider, signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AppProps } from "next/app";

// This call would be wrapped in your form component and bound to your login or submit button

export default function Home(props: AppProps) {
  const router = useRouter();
  const handleLogin = async () => {
    const res = await signIn("credentials", {
      email: "a@a.com",
      password: "123",
      redirect: false,
      // callbackUrl: "localhost:2000/dashboard", // the url to redirect to on succesful login
    });

    console.log("res sign in", res);

    if (res?.ok) {
      router.push("/dashboard");
    }
  };

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 32,
        width: "100vw",
        height: "100vh",
        padding: 32,
      }}
    >
      <h1 className="text-xl text-center">Aplikasi Main</h1>
      <div></div>
      <div>
        <button
          style={{
            padding: "8px 16px",
            fontSize: 16,
          }}
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
      <div>
        <h1>Content</h1>
        {/* <SessionProvider session={props.pageProps?.session}> */}
        <Expose />
        {/* </SessionProvider> */}
      </div>
      <Link href="/dashboard">Go to dashboard</Link>
    </main>
  );
}
