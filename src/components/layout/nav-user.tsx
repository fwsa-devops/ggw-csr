'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { signIn, useSession } from "next-auth/react";

export default function NavUser() {
  // const session = await getServerAuthSession();
  const session = useSession();

  if (!session || !session?.data?.user) {
    return (
      <Button size={"sm"} variant={"link"} onClick={() => signIn("google")}>
        Sign In
      </Button>
    );
  }

  const name = session?.data.user?.name;
  const nameFallBack = name
    ?.split(" ")
    .map((_n) => _n[0])
    .join("");

  return (
    <>
      <div className="flex justify-end gap-3">
        <Avatar>
          <AvatarImage src={session.data.user.image ?? ""} />
          <AvatarFallback>{nameFallBack}</AvatarFallback>
        </Avatar>
      </div>
    </>
  );
}
