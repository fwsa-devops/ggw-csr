/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Progress } from "@/components/ui/progress";
import { type User } from "@prisma/client";
import { findMany } from "@/server/service/participant.service";
import logger from "@/lib/logger";
import { Separator } from "@/components/ui/separator";
import UserAvatar from "@/components/ui/user-avatar";
import ExportParticipants from "./participants/export-participants";
import { type IEvent } from "@/server/model";
import { db } from "@/server/db";
import GuestScan from "./participants/guest-scan";

type Props = {
  event: IEvent;
};

export default async function ManageParticipants(props: Props) {
  const { data: _participants } = await findMany(props.event.id);

  let participants: { User: User }[] = [];
  if (
    _participants &&
    _participants.length > 0 &&
    typeof _participants !== "string"
  ) {
    participants = _participants.filter((item) => typeof item !== "string") as {
      User: User;
    }[];
  }

  const percentage =
    props.event.maxParticipants > 0
      ? (participants.length / props.event.maxParticipants) * 100
      : 100;

  logger.info("participants", participants);

  const checkedInList = await db.eventParticipant.findMany({
    where: {
      eventId: props.event.id,
      checkedIn: true,
    },
  });

  return (
    <>
      <div className="mt-4 p-4">
        <div>
          <div className="flex flex-row justify-between">
            <h2 className="mb-4 text-2xl">At a Glance</h2>
            <GuestScan eventId={props.event.id} />
          </div>
          <div>
            <p className="mb-2">
              <span className="mr-2">{checkedInList.length}</span>
              Checked In
            </p>
            <Progress value={checkedInList.length / participants.length} />
          </div>
        </div>

        <Separator className="my-10" />

        <div>
          <div className="mb-4 flex flex-row items-end justify-between">
            <h2 className="text-2xl">Guest List ({participants.length})</h2>
            <div>
              <ExportParticipants
                event={props.event}
                participants={participants}
              />
            </div>
          </div>
          <div>
            <div className="mt-4 text-muted-foreground">
              <div className="isolate flex flex-wrap gap-2">
                {participants.map((participant) => (
                  <UserAvatar
                    key={participant.User.id}
                    user={participant.User}
                  />
                ))}

                {participants.length === 0 && (
                  <p className="w-full text-center">
                    No participants yet. Share your event link to invite
                    participants.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
