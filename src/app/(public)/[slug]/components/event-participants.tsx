/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import UserAvatar from "@/components/ui/user-avatar";
import { findMany } from "@/server/service/participant.service";
import { type User } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { useEffect, useState } from "react";

export default function EventParticipants(props: {
  eventId: string;
  participants: { User: User }[];
}) {
  const [participants, setParticipants] = useState<{ User: User }[]>(
    props.participants,
  );

  useEffect(() => {
    setParticipants(props.participants);
    void findMany(props.eventId)
      .then((res) => {
        if (res.status === StatusCodes.OK) {
          const { data } = res;
          if (data && data.length > 0 && typeof data !== "string") {
            setParticipants(
              data.filter((item) => typeof item !== "string") as {
                User: User;
              }[],
            );
          }
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className="mb-10">
      <h2 className="mb-1">
        Participants
        <span className="ml-2">({participants.length})</span>
      </h2>
      <Separator />
      <div className="mt-4 text-muted-foreground">
        {/* <ScrollArea className="max-h-[500px] overflow-auto"> */}
          <div className="isolate flex flex-wrap gap-2">
            {participants.map((participant) => (
              <UserAvatar key={participant.User.id} user={participant.User} />
            ))}

            {participants.length === 0 && (
              <p>Be the first to register for this event!</p>
            )}
          </div>
        {/* </ScrollArea> */}
      </div>
    </div>
  );
}
