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
import { Badge } from "@/components/ui/badge";
import { type IEvent } from "@/server/model";
import { Users } from "lucide-react";

type Props = {
  event: IEvent;
};

export default function ParticipantLimit(props: Props) {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <div className="flex flex-row items-center gap-3 rounded-md border px-3 py-2">
            <Users className="h-full w-fit rounded-md bg-green-600 p-2 text-primary-foreground" />
            <div className="flex w-full flex-row items-center justify-between text-left">
              <h2 className="text-xl font-medium"> Capacity </h2>
              <p className="text-sm text-muted-foreground">
                {props.event.maxParticipants > 0 ? (
                  <Badge variant={"default"}>
                    {props.event.maxParticipants}
                  </Badge>
                ) : (
                  <Badge variant={"default"}>Unlimited</Badge>
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
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
