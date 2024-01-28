'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@prisma/client";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { AlarmCheckIcon, MapPinIcon } from "lucide-react";
import Link from "next/link";


type EventItemProps = {
  event: {
    id: string;
    name: string;
    startDateTime: Date;
    endDateTime: Date;
    organizer: Partial<User>;
  }
}

const EventItem2 = (
  { event }: EventItemProps
) => {

  return (
    <>
      <Card className={cn("w-[300px] p-2 px-4 mb-3 rounded-xl")}>
        <CardHeader className="p-0 mb-1">
        </CardHeader>
        <CardContent className="p-0">
          <Link href={`/e/${event.id}`}>
            <CardTitle className="text-xl text-wrap mb-2">
              {event.name}
            </CardTitle>
          </Link>
          <CardDescription suppressHydrationWarning>
            <ol suppressHydrationWarning>
              <li className="text-sm flex mb-1">
                <AlarmCheckIcon size={16} className="mr-1" />
                {format(event.startDateTime, 'HH:mm a')}
              </li>
              <li className="text-sm flex mb-1">
                <MapPinIcon size={16} className="mr-1" />
                To be announced
              </li>
            </ol>
          </CardDescription>
        </CardContent>
      </Card>

    </>
  )

};

export default EventItem2;