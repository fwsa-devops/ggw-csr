"use client";

import { Badge } from "@/components/ui/badge";
import { type IEvent } from "@/server/model";
import { type User } from "@prisma/client";
import { ArrowUpRight } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

type Props = {
  event: IEvent;
  user: User;
};

export default function EventManageLink(props: Props) {
  const { data, status } = useSession();

  if (status === "loading") return null;
  if (status === "unauthenticated") return null;
  if (!data?.user) return null;

  const { event } = props;
  const isCurrentUser = props.user.id === data.user?.id;

  const isHost = event.User.find((host) => host.id === data.user?.id);
  if (!isHost) return null;

  return (
    <>
      {isCurrentUser && <Link href={[event.slug, "manage"].join("/")}>
        <Badge variant={"default"}>
          Manage
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </Badge>
      </Link>}
    </>
  );
}
