"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function PageNotAuthorized() {
  const router = useRouter();
  

  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        {/* <p className="text-base font-semibold text-muted-foreground">401</p> */}
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          Not Authorized
        </h1>
        <p className="mt-6 text-base leading-7">
          Sorry, you are not authorized to view this page.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button variant={"default"} onClick={() => router.back()}>
            Go back home
          </Button>
          <Button variant={"link"} onClick={()=> signIn("google")}>
            Login
            <ArrowRight className="ml-2 h-4 w-5" />
          </Button>
        </div>
      </div>
    </main>
  );
}
