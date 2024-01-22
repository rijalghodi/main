import Image from "next/image";
// import { Inter } from "next/font/google";
import dynamic from "next/dynamic";

const Expose = dynamic(() => import("child/Expose"), {
  ssr: false,
});

import React, { lazy, useEffect } from "react";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const session = useSession();

  console.log("session", session);
  const router = useRouter();

  const handleLogout = async () => {
    signOut({ redirect: false, callbackUrl: "/" });
    // if (res?.url) router.push("/");
  };

  useEffect(() => {
    if (session.status === "unauthenticated" || !session || !session.status) {
      router.push("/");
    }
  }, [session]);

  if (session.status === "authenticated") {
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
        <h1 className="text-xl text-center">
          Aplikasi Main - Halaman Dashboard
        </h1>
        <pre>{JSON.stringify(session)}</pre>
        <div>
          <button
            style={{
              padding: "8px 16px",
              fontSize: 16,
            }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        {/* <Expose /> */}
      </main>
    );
  }

  return <div>Loading...</div>;
}
