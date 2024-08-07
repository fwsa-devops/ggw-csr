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
import logger from "@/lib/logger";
import { type IEvent } from "@/server/model";
import { Ticket } from "lucide-react";
import * as EventService from "@/server/service/event.service";
import { StatusCodes } from "http-status-codes";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";

type Props = {
  event: IEvent;
};

export default function RegistrationStatus(props: Props) {
  const router = useRouter();

  const openRegistration = async () => {
    try {
      logger.error("openRegistration");
      const response = await EventService.openRegistration(props.event.id);
      if (response?.status !== StatusCodes.OK) {
        throw new Error(response?.message);
      }
      toast.success("Registration is Now open");
      router.refresh();
    } catch (error) {
      logger.error("Error openRegistration", error);
      toast.error("Failed to open registration");
    }
  };

  const closeRegistration = async () => {
    try {
      logger.error("openRegistration");
      const response = await EventService.closeRegistration(props.event.id);
      logger.debug(response);
      if (response?.status !== StatusCodes.OK) {
        throw new Error(response?.message);
      }
      toast.success("Registration is Now closed");
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
            <Ticket className="h-full w-fit rounded-md bg-blue-500 p-2 text-primary-foreground" />
            <div className="flex w-full flex-row items-center justify-between text-left">
              <h2 className="text-xl font-medium">Registration</h2>
              <p className="text-sm text-muted-foreground">
                {props.event.isParticipationOpen ? (
                  <Badge variant={"default"}>Open</Badge>
                ) : (
                  <Badge variant={"destructive"}>Closed</Badge>
                )}
              </p>
            </div>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Registration</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel> Cancel </AlertDialogCancel>
            {!props.event.isParticipationOpen && (
              <AlertDialogAction onClick={openRegistration}>
                Open
              </AlertDialogAction>
            )}
            {props.event.isParticipationOpen && (
              <AlertDialogAction onClick={closeRegistration}>
                Close
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
