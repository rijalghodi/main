import Image from "next/image";
// import { Inter } from "next/font/google";
import dynamic from "next/dynamic";

// const inter = Inter({ subsets: ["latin"] });

// const Dashboard = dynamic(() => import("dashboard/dashboard"), {
//   ssr: false,
// });

// const Button = dynamic(() => import("dashboard/button"), {
//   ssr: false,
// });

// const Expose = dynamic(() => import("child/Expose"), {
//   ssr: false,
// });
const PlusButton = dynamic(() => import("child/PlusButton"), {
  ssr: false,
});

import React, { lazy } from "react";

// const PlusButton = lazy(() => import("child/PlusButton"));
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
      <h1 className="text-xl text-center">Aplikasi Main</h1>
      {/* <div className="px-4 py-2 bg-slate-700 rounded-sm mt-4">x</div> */}
      {/* <Button />
      <Dashboard /> */}
      <PlusButton />
      {/* <Expose /> */}
    </main>
  );
}
