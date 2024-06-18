"use client";

import { Badge } from "@/components/ui/badge";
import { type IEvent } from "@/server/model";
import { ArrowUpRight } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";

type Props = {
  event: IEvent;
};

export default function EventManageLink(props: Props) {
  const { data, status } = useSession();

  if (status === "loading") return null;
  if (status === "unauthenticated") return null;
  if (!data?.user) return null;

  const { event } = props;

  if (event.User.email !== data.user.email) return null;

  return (
    <>
      <Link href={[event.slug, "manage"].join("/")}>
        <Badge variant={"default"}>
          Manage
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </Badge>
      </Link>
    </>
  );
}
