import { type Event } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import EventImageDialog from "./event-image-dialog";

type Props = {
  event: Event;
};

export default function ManageOverview(props: Props) {
  return (
    <>
      <div className="mt-4 p-2">
        <div>
          <Card className="">
            <CardContent className="p-3">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="col-span-1">
                  <EventImageDialog event={props.event}>
                    <Image
                      src={props.event.image}
                      alt={props.event.title}
                      width={"720"}
                      height={"720"}
                      priority={true}
                      className="rounded-md object-cover object-center md:max-h-[400px] md:min-h-[300px] md:w-full"
                    />
                  </EventImageDialog>
                </div>
                <div className="col-span-1"></div>
              </div>
            </CardContent>
            {/* <CardFooter className="p-3 flex justify-between">
              <Button size={"sm"} variant="outline">Cancel</Button>
              <Button size={"sm"}>Deploy</Button>
            </CardFooter> */}
          </Card>
        </div>
      </div>
    </>
  );
}
