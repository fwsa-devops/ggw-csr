"use client";

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Hand } from "lucide-react";
import { cn } from "../../../../lib/utils";
import {
  Credenza,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";

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
import EventPass from "./event-pass";
import { type IEvent } from "@/server/model";

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

type Props = {
  event: IEvent;
};

export default function EventRegister(props: Props) {
  const { status, data } = useSession();
  const [fetched, setFetched] = useState<boolean>(false);
  const [updatingStatus, setUpdatingStatus] = useState<boolean>(false);
  const [isParticipant, setIsParticipant] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (data?.user && !fetched) {
      void isEventParticipant(props.event.id)
        .then(async (res) => {
          console.log(res);
          setIsParticipant(!!res.data);
          setFetched(true);
        })
        .catch((err) => {
          setFetched(true);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.user]);

  const handleChange = async () => {
    try {
      setUpdatingStatus(true);
      if (!data?.user) throw new Error("User not found");
      if (isParticipant) {
        await remove(props.event.id, data.user?.id);
        await wait(1000);
        setIsParticipant(false);
        toast.success("Registration cancelled");
      } else {
        await create(props.event.id, data.user?.id);
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
      <>
        {props.event.isParticipationOpen && (
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
        )}
      </>
    );

  if (fetched)
    return (
      <>
        <div className={cn("mt-10")}>
          {!isParticipant && props.event.isParticipationOpen && (
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
          )}

          {isParticipant && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <EventPass value={JSON.stringify(data.user.email)} />
              <EventCancelRegistration
                status={updatingStatus}
                handleChange={handleChange}
              />
            </div>
          )}
        </div>
      </>
    );

  return null;
}

const EventCancelRegistration = (props: {
  status: boolean;
  handleChange: () => void;
  className?: string;
}) => {
  const { handleChange, status } = props;
  const [prompt, setPrompt] = useState<number>(0);

  return (
    <Credenza>
      <CredenzaTrigger asChild>
        {/* <Button variant="outline">Show Dialog</Button> */}
        <Button
          variant={"outline"}
          size={"lg"}
          type="button"
          className="w-full"
          onClick={() =>
            setPrompt(Math.floor(Math.random() * promptMessages.length))
          }
        >
          Cancel Registration
        </Button>
      </CredenzaTrigger>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>{promptMessages[prompt]}</CredenzaTitle>
          <CredenzaDescription>
            Are you sure you want to cancel your registration?
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaFooter>
          <CredenzaClose asChild>
            <Button
              size={"lg"}
              variant={"outline"}
              className="w-full"
              autoFocus
            >
              No
            </Button>
          </CredenzaClose>
          <CredenzaClose asChild>
            <Button
              className="w-full"
              size={"lg"}
              onClick={handleChange}
              disabled={status}
            >
              Yes
            </Button>
          </CredenzaClose>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  );
};
