"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { type IEvent } from "@/server/model";
import { Settings, Ticket } from "lucide-react";
import * as EventService from "@/server/service/event.service";
import { StatusCodes } from "http-status-codes";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import logger from "@/lib/logger";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Props = {
  event: IEvent;
};

export default function EventStatus(props: Props) {
  const router = useRouter();

  const openEvent = async () => {
    try {
      logger.error("openEvent");
      const response = await EventService.openEvent(props.event.id);
      if (response?.status !== StatusCodes.OK) {
        throw new Error(response?.message);
      }
      toast.success("Registration is Now open");
      router.refresh();
    } catch (error) {
      logger.error("Error openEvent", error);
      toast.error("Failed to update event status");
    }
  };

  const closeEvent = async () => {
    try {
      logger.error("closeEvent");
      const response = await EventService.closeEvent(props.event.id);
      logger.debug(response);
      if (response?.status !== StatusCodes.OK) {
        throw new Error(response?.message);
      }
      toast.success("Event in now InActive");
      router.refresh();
    } catch (error) {
      logger.error("Error closeEvent", error);
      toast.error("Failed to update event status");
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <div className="flex flex-row items-center gap-3 rounded-md border px-3 py-2">
            <Settings className="h-full w-fit rounded-md bg-red-500 p-2 text-primary-foreground" />
            <div className="text-left w-full flex flex-row justify-between items-center">
              <h2 className="text-xl font-medium">Event</h2>
              <p className="text-sm text-muted-foreground">
                {props.event.isActive ? (
                  <Badge variant={'default'}>Active</Badge>
                ) : (
                  <Badge variant={'destructive'}>In-Active</Badge>
                )}
              </p>
            </div>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel> Cancel </AlertDialogCancel>
            {!props.event.isActive && (
              <AlertDialogAction asChild onClick={openEvent}>
                <Button variant={"default"}>Open</Button>
              </AlertDialogAction>
            )}
            {props.event.isActive && (
              <AlertDialogAction asChild onClick={closeEvent}>
                <Button variant={"destructive"}>Archive</Button>
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
