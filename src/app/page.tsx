"use client";

import dynamic from "next/dynamic";

// The marketing home renders the R3F swarm — client-only, no SSR.
const IndexPage = dynamic(() => import("@/screens/Index"), { ssr: false });

export default function HomeRoute() {
  return <IndexPage />;
}
