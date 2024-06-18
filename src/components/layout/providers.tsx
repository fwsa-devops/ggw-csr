"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

import { type EdgeStoreRouter } from "@/app/api/edgestore/[...edgestore]/route";
import { createEdgeStoreProvider } from "@edgestore/react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const { EdgeStoreProvider, useEdgeStore } =
  createEdgeStoreProvider<EdgeStoreRouter>();

export { useEdgeStore };

export default function CustomProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SessionProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
          <ProgressBar
            height="2px"
            color="#000"
            options={{ showSpinner: false, minimum: 0.1, easing: "ease", speed: 200}}
          />
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}
