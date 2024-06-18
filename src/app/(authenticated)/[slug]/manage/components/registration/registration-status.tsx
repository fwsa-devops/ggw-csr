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
import { Ticket } from "lucide-react";

export default function RegistrationStatus() {
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <div className="flex flex-row items-center gap-3 rounded-md border px-3 py-2">
            <Ticket className="h-full w-fit rounded-md bg-gray-200 p-2 dark:bg-gray-700" />
            <div className="text-left">
              <h2 className="font-medium">Registration</h2>
              <p className="text-sm text-muted-foreground">Open</p>
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
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
