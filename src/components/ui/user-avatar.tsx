/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function UserAvatar({
  user,
  className,
}: {
  user: User;
  className?: string;
}) {
  return (
    // <Link href={`/user/${user.id}`}>
      <Avatar className={cn(className)}>
        <AvatarImage src={user.image!} alt={user.name!} />
        <AvatarFallback>
          {user.name
            ?.split(" ")
            .map((name) => name[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
    // </Link>
  );
}
