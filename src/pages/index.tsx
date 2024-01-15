import Image from "next/image";
// import { Inter } from "next/font/google";
import dynamic from "next/dynamic";

// const inter = Inter({ subsets: ["latin"] });

const Dashboard = dynamic(() => import("dashboard/dashboard"), {
  ssr: false,
});
const Button = dynamic(() => import("dashboard/button"), {
  ssr: false,
});

import React, { lazy } from "react";

// const Dashboard = lazy(() =>
//   window.next2.get("./dashboard").then((dashboard) => {
//     return { default: dashboard() };
//   })
// );

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <h1>Aplikasi Main</h1>
      <Button />
      <Dashboard />
    </main>
  );
}
