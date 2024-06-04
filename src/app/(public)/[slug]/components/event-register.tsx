"use client";

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Hand } from "lucide-react";
import { cn } from "../../../../lib/utils";
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
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import {
  isParticipant as isEventParticipant,
  create,
  remove,
} from "@/server/service/participant.service";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import wait from "wait";
import { useRouter } from "next/navigation";

// "Are you sure you want to cancel?",
// "Are you absolutely sure?",

const promptMessages = [
  "Did you put our feelings into consideration?",
  "Have you thought this through?",
  "Are you certain you want to cancel?",
  "We hope you reconsider",
  "We hope to see you soon",
  "We hope you change your mind",
  "Think, think, think",
  "Are you sure about leaving us?",
  "What if we told you there’s more to come?",
];

export default function EventRegister(props: { eventId: string }) {
  const { status, data } = useSession();
  const [fetched, setFetched] = useState<boolean>(false);
  const [updatingStatus, setUpdatingStatus] = useState<boolean>(false);
  const [isParticipant, setIsParticipant] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (data?.user && !fetched) {
      void isEventParticipant(props.eventId)
        .then(async (res) => {
          setIsParticipant(!!res.data);
          setFetched(true);
        })
        .catch((err) => {
          setFetched(true);
        });
    }
  }, [data?.user, props.eventId]);

  const handleChange = async () => {
    try {
      setUpdatingStatus(true);
      if (!data?.user) throw new Error("User not found");
      if (isParticipant) {
        await remove(props.eventId, data.user?.id);
        await wait(1000);
        setIsParticipant(false);
        toast.success("Registration cancelled");
      } else {
        await create(props.eventId, data.user?.id);
        await wait(1000);
        setIsParticipant(true);
        toast.success("Registered successfully");
      }
      setUpdatingStatus(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      setUpdatingStatus(false);
      toast.error("Failed to register");
    }
  };

  if (status === "loading" ?? !fetched) return;

  if (status === "unauthenticated" ?? !data?.user)
    return (
      <div
        className={cn(
          "mt-10 flex flex-row items-center gap-6 text-muted-foreground",
        )}
      >
        <Button
          variant={"secondary"}
          size={"lg"}
          type="button"
          className="w-full"
          onClick={() => signIn("google")}
        >
          Login to Register
        </Button>
      </div>
    );

  if (fetched)
    return (
      <>
        <div
          className={cn(
            "mt-10 flex flex-row items-center gap-6 text-muted-foreground",
          )}
        >
          {!isParticipant ? (
            <Button
              variant={"default"}
              size={"lg"}
              type="button"
              className="group w-full py-6"
              onClick={handleChange}
              disabled={updatingStatus}
            >
              <Hand size={24} className="mr-3 group-hover:animate-shake" />
              Register
            </Button>
          ) : (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                {/* <Button variant="outline">Show Dialog</Button> */}
                <Button
                  variant={"outline"}
                  size={"lg"}
                  type="button"
                  className="group w-full py-6"
                >
                  Cancel Registration
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {
                      promptMessages[
                        Math.floor(Math.random() * promptMessages.length)
                      ]
                    }
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to cancel your registration?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="w-full" autoFocus>
                    No
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="w-full"
                    onClick={handleChange}
                    disabled={updatingStatus}
                  >
                    Yes
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </>
    );

  return null;
}