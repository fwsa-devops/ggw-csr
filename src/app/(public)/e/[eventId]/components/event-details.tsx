import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { ClockIcon, MapPinIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Countdown from "./countdown";
import { Badge } from "@/components/ui/badge";


export default async function EventDetails(
  { event, isOrganizer, isRegistered }:
    { event: any, isOrganizer: boolean, isRegistered: boolean }
) {

  const session = await getServerSession();

  const hasEventStarted = (event.startDateTime.getTime() - new Date().getTime()) < 0;

  const hasEventEnded = (event.endDateTime.getTime() - new Date().getTime()) < 0;

  return (
    <>
      <section>

        <div className="mb-5">
          <h1 className="text-3xl font-bold">
            {event.name}
          </h1>
          <p className="text-sm">
            Hosted by
            <strong className="font-medium"> {event.organizer.name}</strong>
          </p>
        </div>

        <div className="mb-5">
          <ul>
            <li className="flex items-center gap-3 mb-3">
              <div className="w-[50px] h-[50px] border rounded-lg overflow-hidden text-center">
                <p className="bg-gray-600 text-white text-sm">{format(event.startDateTime, 'MMM')}</p>
                <p className="text-base mt-[2px]">{format(event.startDateTime, 'd')}</p>
              </div>
              <div>
                <p className="text-lg font-medium">{format(event.startDateTime, 'EEEE, do MMMM')}</p>
                <p className="text-sm">{
                  format(event.startDateTime, 'HH:mm')
                  + ' - ' +
                  (event.startDateTime.getDate() === event.endDateTime.getDate()
                    ? format(event.endDateTime, 'HH:mm')
                    : format(event.endDateTime, 'do MMM, HH:mm'))
                }</p>
              </div>
            </li>
            <li className="flex items-center gap-3 mb-3">
              <div className="w-[50px] h-[50px] border rounded-lg overflow-hidden text-center flex items-center justify-center ">
                <MapPinIcon size={22} />
              </div>
              <div>
                <p>
                  To be announced
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="mb-5">
          {/* The  event has not started and the user is not registered */}
          {
            (!hasEventStarted && !isRegistered) && <Card className="rounded-md overflow-hidden">
              <CardHeader className="p-2 px-3 bg-gray-300">
                <CardTitle className="text-base font-medium">Registration</CardTitle>
              </CardHeader>
              <CardContent className="py-2 px-3">
                <p className="mb-4">
                  Welcome! This event is free to attend. Please register to get access to the event.
                </p>

                <div className="mb-2">
                  <h3 className="text-lg font-semibold"> {session?.user?.name}</h3>
                  <p className="text-sm"> {session?.user?.email} </p>
                </div>

                <div className="w-full">
                  <Button
                    variant={'default'}
                    className="w-full"
                  >
                    <Link href={`/event/${event.id}/register`}>Register</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          }

          {/* The event has not started and the user is registered */}
          {
            (!hasEventStarted && isRegistered) && <div>
              <Card className="rounded-md overflow-hidden">
                <CardHeader className="p-2 px-3 bg-gray-300">
                  <CardTitle className="text-base font-medium">You're In</CardTitle>
                </CardHeader>
                <CardContent className="py-2 px-3">
                  <p className="mb-4">
                    You're registered for this event. We'll send you an email with the details.
                  </p>

                  <div className="mb-2 bg-gray-400 rounded-lg text-base p-2 flex items-center gap-2">
                    <ClockIcon size={16} />
                    Event starts
                    <Countdown dateTime={event.startDateTime} />
                  </div>

                  <div>
                    <p>
                      No longer able to attend? <Link
                      className="underline"
                       href={`/event/${event.id}/unregister`}>Unregister</Link>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          }

          {/* The event has started and the user is not registered */}
          {
            (hasEventStarted && !hasEventEnded && !isRegistered) && <div>
              <Card className="rounded-md overflow-hidden">
                <CardHeader className="p-2 px-3 bg-gray-300">
                  <CardTitle className="text-base font-medium">Event has started</CardTitle>
                </CardHeader>
                <CardContent className="py-2 px-3">
                  <p className="">
                    This event has started.
                  </p>
                </CardContent>
              </Card>
            </div>
          }

          {/* The event has started and the user is registered */}
          {
            (hasEventStarted && !hasEventEnded && isRegistered) && <div>
              <Card className="rounded-md overflow-hidden">
                <CardHeader className="p-2 px-3 bg-gray-300">
                  <CardTitle className="text-base font-medium">You're In</CardTitle>
                </CardHeader>
                <CardContent className="py-2 px-3">
                  <p className="mb-4">
                    You're registered for this event. We'll send you an email with the details.
                  </p>

                  <div className="mb-2 bg-gray-400 rounded-lg text-base p-2 flex items-center gap-2">
                    <ClockIcon size={16} />
                    Event started
                    <Countdown dateTime={event.startDateTime} />
                  </div>
                  <div>
                    <p>
                      No longer able to attend? <Link href={`/event/${event.id}/unregister`}>Unregister</Link>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          }

          {/* The event has ended */}
          {
            hasEventEnded && <div>
              <Card className="rounded-md overflow-hidden">
                <CardHeader className="p-2 px-3 bg-gray-300">
                  <CardTitle className="text-base font-medium">Event has ended</CardTitle>
                </CardHeader>
                <CardContent className="py-2 px-3">
                  <p className="">
                    This event has ended. We hope you enjoyed it.
                  </p>
                </CardContent>
              </Card>
            </div>
          }
        </div>

        <div>
          {/* You are the organizer */}
          {
            isOrganizer && <div>
              <Card className="rounded-md overflow-hidden">
                <CardHeader className="p-2 px-3 bg-gray-300">
                  <CardTitle className="text-base font-medium">Organizer</CardTitle>
                </CardHeader>
                <CardContent className="py-2 px-3">
                  <p className="flex items-center lg:justify-between">
                    You are hosting this event
                    <Badge
                      variant="destructive"
                      className="ml-1">
                      <Link href={`/event/${event.id}/manage`}>Manage</Link>
                    </Badge>
                  </p>
                </CardContent>
              </Card>
            </div>
          }
        </div>

      </section>


      {
        isOrganizer && (
          <p>
            You are hosting this event
            <Link className="mx-2" href={`/event/${event.id}/manage`}>Manage</Link>
          </p>
        )
      }

    </>

  )

}