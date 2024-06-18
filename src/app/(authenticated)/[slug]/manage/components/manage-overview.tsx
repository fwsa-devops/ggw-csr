import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import EventImageDialog from "./overview/event-image-dialog";
import { type IEvent } from "@/server/model";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import EventAddHost from "./overview/event-add-host";

type Props = {
  event: IEvent;
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

        <Separator className="my-4" />

        <section>
          <div className="mb-2 flex-row items-end justify-between md:flex">
            <div className="mb-4 md:mb-0">
              <h2 className="text-lg"> Host </h2>
              <p className="text-sm text-muted-foreground">
                Add hosts, special guests and speakers to your event.
              </p>
            </div>
            <div>
              <EventAddHost eventSlug={props.event.slug} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
