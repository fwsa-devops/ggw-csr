"use client";

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Hand } from "lucide-react";
import { cn } from "../../../../lib/utils";
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

export default function EventRegister(props: { eventId: string }) {
  const { status, data } = useSession();
  const [fetching, setFetching] = useState<boolean>(false);
  const [updatingStatus, setUpdatingStatus] = useState<boolean>(false);
  const [isParticipant, setIsParticipant] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (data?.user && !fetching) {
      setFetching(true);
      void isEventParticipant(props.eventId)
        .then(async (res) => {
          setIsParticipant(!!res.data);
          setFetching(false);
        })
        .catch((err) => {
          console.error(err);
          setFetching(false);
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

  if (status === "loading" ?? fetching) return;

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
          <Button
            variant={"outline"}
            size={"lg"}
            type="button"
            className="group w-full py-6"
            onClick={handleChange}
            disabled={updatingStatus}
          >
            Cancel Registration
          </Button>
        )}
      </div>
    </>
  );
}
