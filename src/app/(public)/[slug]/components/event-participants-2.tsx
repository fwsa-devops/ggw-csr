/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import UserAvatar from "@/components/ui/user-avatar";
import { findMany } from "@/server/service/participant.service";
import { type User } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import { useEffect, useState } from "react";

export default function EventParticipants2(props: {
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
        {/* <span className="ml-2">({participants.length})</span> */}
      </h2>
      <Separator />
      <div className="mt-4 text-muted-foreground">
        <div>
          {participants.length === 0 && (
            <p>Be the first to register for this event!</p>
          )}

          <ParticipantListDialog participants={participants}>
            <div className="isolate mb-3 flex flex-wrap -space-x-2">
              {participants.slice(0, 10).map((participant) => (
                <UserAvatar key={participant.User.id} user={participant.User} />
              ))}
            </div>

            {participants.length > 5 && (
              <div className="text-left font-light hover:text-black dark:hover:text-white">
                {participants
                  .slice(0, 4)
                  .map((_u) => _u.User.name?.split(" ")[0])
                  .join(", ")
                  .concat(" and ")}
                <span >+{participants.length - 4}</span>
              </div>
            )}
          </ParticipantListDialog>
        </div>
      </div>
    </div>
  );
}

export function ParticipantListDialog(props: {
  children: React.ReactNode;
  participants: { User: User }[];
}) {
  return (
    <Sheet>
      <SheetTrigger>{props.children}</SheetTrigger>
      <SheetContent className="max-w-screen sm:max-w-screen hidden flex-col md:flex md:w-3/5 lg:w-2/5">
        <SheetHeader className="mb-5">
          <SheetTitle>Participant List</SheetTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </SheetHeader>
        <ScrollArea className="flex-1 overflow-auto">
          <div className="grid grid-cols-2 justify-between">
            {props.participants.map((participant, _idx) => (
              <div
                key={_idx}
                className="mx-2 mb-3 flex flex-row items-center gap-3"
              >
                <UserAvatar key={participant.User.id} user={participant.User} />
                <p className="text-muted-foreground">
                  {" "}
                  {participant.User.name}{" "}
                </p>
              </div>
            ))}
          </div>

          {/* <div className="isolate flex flex-wrap gap-2">
            {props.participants.map((participant) => (
              <UserAvatar key={participant.User.id} user={participant.User} />
            ))}

            {props.participants.length === 0 && (
              <p>Be the first to register for this event!</p>
            )}
          </div> */}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
