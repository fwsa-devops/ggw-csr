import { type IEvent } from "@/server/model";
import RegistrationStatus from "./registration/registration-status";
import ParticipantLimit from "./registration/participant-limit";
import EventStatus from "./registration/event-status";
import EventVisibility from "./registration/event-visibility";

type Props = {
  event: IEvent;
};

export default async function ManageSettings(props: Props) {
  return (
    <>
      <div className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-4">
          <ParticipantLimit event={props.event} />
          <RegistrationStatus event={props.event} />
          <EventVisibility event={props.event} />
          <EventStatus event={props.event} />
        </div>
      </div>
    </>
  );
}
