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

export default function EventVisibility(props: Props) {
  const router = useRouter();

  const setVisibilityPublic = async () => {
    try {
      logger.error("Event PUBLIC");
      const response = await EventService.setVisibilityPublic(props.event.id);
      if (response?.status !== StatusCodes.OK) {
        throw new Error(response?.message);
      }
      toast.success("Registration is Now public");
      router.refresh();
    } catch (error) {
      logger.error("Error openRegistration", error);
      toast.error("Failed to update event Visibility");
    }
  };

  const setVisibilityPrivate = async () => {
    try {
      logger.error("Event PRIVATE");
      const response = await EventService.setVisibilityPrivate(props.event.id);
      logger.debug(response);
      if (response?.status !== StatusCodes.OK) {
        throw new Error(response?.message);
      }
      toast.success("Registration is Now Private");
      router.refresh();
    } catch (error) {
      logger.error("Error openRegistration", error);
      toast.error("Failed to Close registration");
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <div className="flex flex-row items-center gap-3 rounded-md border px-3 py-2">
            <Settings className="h-full w-fit rounded-md bg-yellow-500 p-2 text-primary-foreground" />
            <div className="flex w-full flex-row items-center justify-between text-left">
              <h2 className="text-xl font-medium">Visibility</h2>
              <p className="text-sm text-muted-foreground">
                {props.event.isPublic ? (
                  <Badge variant={"default"}>Public</Badge>
                ) : (
                  <Badge variant={"destructive"}>Private</Badge>
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
            {!props.event.isPublic && (
              <AlertDialogAction asChild onClick={setVisibilityPublic}>
                <Button variant={"default"}>Public</Button>
              </AlertDialogAction>
            )}
            {props.event.isPublic && (
              <AlertDialogAction asChild onClick={setVisibilityPrivate}>
                <Button variant={"destructive"}>Private</Button>
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
