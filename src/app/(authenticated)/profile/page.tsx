/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Separator } from "@/components/ui/separator";
import { SessionValidator } from "@/server/validators/session.validator";
import { AtSign, CalendarDays, MapPin, MicVocal, Ticket } from "lucide-react";
import { DateTime } from "luxon";
import { signIn } from "next-auth/react";
import Image from "next/image";
import UserAvatar from "@/components/ui/user-avatar";
import Link from "next/link";
import {
  userCreatedEvent,
  userRegisteredEvent,
} from "@/server/service/profile.service";
import UserEventItem from "@/components/shared/user-event-item";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventsHosted from "./components/events-hosted";
import EventsRegistered from "./components/events-registered";

export default async function Page() {
  const session = await SessionValidator.validateSession();

  if (!session) {
    await signIn("google", { callbackUrl: "/profile" });
    return null;
  }

  const { data: events } = await userCreatedEvent(session.id);
  const { data: registeredEvents } = await userRegisteredEvent(session.id);

  return (
    <>
      <div className="ga-8 mx-auto w-full max-w-2xl lg:gap-14">
        <div className="mb-10 flex w-full flex-col sm:flex-row justify-center items-center gap-4 md:gap-10">
          <UserAvatar user={session} className="h-32 w-32 rounded-full" />
          <div className="">
            <h1 className="mb-2 text-lg">{session.name}</h1>
            <p className="my-2 flex flex-row items-center text-sm">
              <AtSign className="mr-2 h-4 w-4" />
              {session.email}
            </p>

            <p className="my-2 flex flex-row items-center text-sm">
              <CalendarDays className="mr-2 h-4 w-4" />
              Joined{" "}
              {DateTime.fromJSDate(session.createdAt).toFormat("LLLL yyyy")}
            </p>
            <p className="my-2 flex flex-row items-center text-sm">
              <MicVocal className="mr-2 h-4 w-4" />
              Hosted{" "}
              <span className="mx-2 font-semibold">
                {" "}
                {events?.length}{" "}
              </span>{" "}
              events
            </p>
            <p className="my-2 flex flex-row items-center text-sm">
              <Ticket className="mr-2 h-4 w-4" />
              Attended{" "}
              <span className="mx-2 font-semibold">
                {" "}
                {registeredEvents?.length}{" "}
              </span>{" "}
              events
            </p>
          </div>
        </div>

        <Tabs defaultValue="registered" className="w-full ">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="registered">Registered</TabsTrigger>
            <TabsTrigger value="hosted">Hosted</TabsTrigger>
          </TabsList>
          <Separator className="w-full" />
          <TabsContent value="registered">
            <EventsRegistered />
          </TabsContent>
          <TabsContent value="hosted">
            <EventsHosted />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
