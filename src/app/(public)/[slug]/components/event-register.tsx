"use client";

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Hand, Users } from "lucide-react";
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
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import {
  isParticipant as isEventParticipant,
  create,
  remove,
} from "@/server/service/participant.service";
import { seatsAvailable as areSeatsAvailable } from "@/server/service/participant.service";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import wait from "wait";
import { useRouter } from "next/navigation";
import { type IEvent } from "@/server/model";
import logger from "@/lib/logger";
import { StatusCodes } from "http-status-codes";

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
  const [seatsAvailable, setSeatsAvailable] = useState<boolean | undefined>(
    undefined,
  );
  const router = useRouter();

  useEffect(() => {
    if (data?.user && !fetched) {
      void areSeatsAvailable(props.event.id)
        .then((res) => {
          logger.debug("areSeatsAvailable", res);
          setIsParticipant(!!res.data);
        })
        .catch((err) => {
          logger.error("isEventParticipant", err);
          setFetched(true);
        });

      void isEventParticipant(props.event.id)
        .then(async (res) => {
          logger.debug("isEventParticipant", res);
          setIsParticipant(!!res.data);
          setFetched(true);
        })
        .catch((err) => {
          logger.error("isEventParticipant", err);
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
        const response = await create(props.event.id, data.user?.id);
        await wait(1000);
        if (response.status === StatusCodes.OK) {
          setIsParticipant(true);
          toast.success("Registered successfully");
        } else {
          toast.error("Registration Failed", {
            description: response.message,
          });
        }
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
          {!seatsAvailable && (
            <Alert className="mt-6">
              <Users className="h-4 w-4" />
              <AlertTitle className="mb-2">No More Spots Available</AlertTitle>
              <AlertDescription className="mb-0 font-normal">
               The maximum number of participants has been reached.
              </AlertDescription>
            </Alert>
          )}

          {seatsAvailable &&
            !isParticipant &&
            props.event.isParticipationOpen && (
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
            <div className="grid grid-cols-1 gap-3">
              {/* <EventPass value={JSON.stringify(data.user.email)} /> */}
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
