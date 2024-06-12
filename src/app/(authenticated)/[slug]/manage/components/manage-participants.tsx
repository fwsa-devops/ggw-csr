/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Progress } from "@/components/ui/progress";
import { type User, type Event } from "@prisma/client";
import { findMany } from "@/server/service/participant.service";
import logger from "@/lib/logger";
import { Separator } from "@/components/ui/separator";
import UserAvatar from "@/components/ui/user-avatar";
import ExportParticipants from "./export-participants";

type Props = {
  event: Event;
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

  return (
    <>
      <div className="mt-4 p-4">
        <div>
          <h2 className="mb-4 text-2xl">At a Glance</h2>
          <div>
            <p className="mb-2">
              <span className="mr-2">{participants.length}</span>
              participants
            </p>
            <Progress value={participants.length > 0 ? percentage : 0} />
          </div>
        </div>

        <Separator className="my-10" />

        <div>
          <div className="mb-4 flex flex-row items-end justify-between">
            <h2 className="text-2xl"> Guest List </h2>
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
