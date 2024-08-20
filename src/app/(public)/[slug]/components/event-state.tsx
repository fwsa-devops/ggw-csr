"use client";

import { type IEvent } from "@/server/model";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CalendarCheck, MinusCircle } from "lucide-react";
import EventRegister from "./event-register";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { findBySlug, eventDetails } from "@/server/service/event.service";
import { StatusCodes } from "http-status-codes";
import logger from "@/lib/logger";
import { Skeleton } from "@/components/ui/skeleton";

export const EventStateManager = ({ id }: { id: string }) => {
  const [_event, setEvent] = useState<IEvent | null>(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      const details = await findBySlug(id);
      if (!eventDetails || details.status !== StatusCodes.OK || !details.data) {
        return;
      }
      logger.debug("SharedState", id);
      logger.debug("EventStateManager", details.data);
      setEvent(details.data as unknown as IEvent);
    };

    void fetchEventDetails();
  }, []);

  if (!_event) return null;

  return (
    <>
      {isEventEnded(_event) && <EventEndedAlert event={_event} />}

      {isRegistrationClosed(_event) && <RegistrationClosedAlert />}

      {!(isEventEnded(_event) || isRegistrationClosed(_event)) && (
        <EventRegisterComponent event={_event} />
      )}
    </>
  );
};

const EventEndedAlert = ({ event }: { event: IEvent }) => (
  <Alert className="mt-6">
    <CalendarCheck className="h-4 w-4" />
    <AlertTitle className="mb-2">Event has ended</AlertTitle>
    <AlertDescription className="mb-0 font-normal">
      This event ended {DateTime.fromJSDate(event.endTime).toRelative()}.
    </AlertDescription>
  </Alert>
);

const RegistrationClosedAlert = () => (
  <Alert className="mt-6 bg-muted">
    <MinusCircle className="h-4 w-4" />
    <AlertTitle className="mb-3 font-normal">Registration Closed</AlertTitle>
    <AlertDescription className="mb-0 font-normal leading-6 text-muted-foreground">
      This event is not currently accepting registrations. You may contact the
      event host for more information.
    </AlertDescription>
  </Alert>
);

const EventRegisterComponent = ({ event }: { event: IEvent }) => (
  <EventRegister event={event} />
);

const isEventEnded = (event: IEvent) => {
  return DateTime.now() > DateTime.fromJSDate(event.endTime);
};

const isRegistrationClosed = (event: IEvent) => {
  return !event.isParticipationOpen && !isEventEnded(event);
};
