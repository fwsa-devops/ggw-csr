"use client";

import ScanQr from "@/components/shared/scan-qr";
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";

import { Button } from "@/components/ui/button";
import logger from "@/lib/logger";
import { type User } from "@prisma/client";
import { type IDetectedBarcode } from "@yudiel/react-qr-scanner";
import { QrCode } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { findByEmail } from "@/server/service/user.service";
import { decrypt } from "@/lib/utils";
import { StatusCodes } from "http-status-codes";
import UserAvatar from "@/components/ui/user-avatar";
import { participantCheckIn } from "@/server/service/participant.service";
import { useRouter } from "next/navigation";

type Props = {
  eventId: string;
};

export default function GuestScan(props: Props) {
  const router = useRouter();

  const [scan, setScan] = useState<boolean>(true);
  const [participants, setParticipants] = useState<User | null>(null);

  const onScan = async (e: IDetectedBarcode[]) => {
    logger.debug(e);
    if (!e.at(0)) return;
    if (!e.at(0)?.rawValue) return;

    const qrString = e.at(0)!.rawValue;
    logger.debug(qrString);
    const userString = decrypt(qrString).replaceAll(`"`, ``).trim();
    logger.debug(userString);
    const response = await findByEmail(userString);
    logger.debug(response);

    if (response.status !== StatusCodes.OK) {
      toast.error("User not found");
      return;
    }

    setScan(false);
    setParticipants(response.data! as User);
  };

  const onSubmit = async () => {
    try {
      logger.debug(participants);
      const response = await participantCheckIn(props.eventId, participants!.id);

      if (response.status !== StatusCodes.OK) {
        toast.error(response.message || "Failed to check in");
        setScan(true);
        return;
      }

      setScan(true);
      toast.success("Checked in successfully");
      router.refresh();
    } catch (error) {
      logger.debug(error);
      toast.error("Failed to check in");
    }
  };

  return (
    <>
      <Credenza>
        <CredenzaTrigger>
          <Button size="sm" variant="secondary">
            <QrCode size={16} className="mr-2" />
            Scan
          </Button>
        </CredenzaTrigger>
        <CredenzaContent>
          <CredenzaHeader>
            <CredenzaTitle>{scan ? "Scan QR Code" : "Guests"}</CredenzaTitle>
            <CredenzaDescription>
              {scan ? "Scan the QR code to check in" : ""}
            </CredenzaDescription>
          </CredenzaHeader>
          <CredenzaBody>
            {scan && <ScanQr onScan={onScan} />}
            {!scan && participants && (
              <>
                <div className="text-center">
                  <UserAvatar
                    user={participants}
                    className="mx-auto mb-3 h-28 w-28"
                  />
                  <h1 className="mb-1 text-xl">{participants?.name}</h1>
                  <p>{participants?.email}</p>
                </div>
              </>
            )}
          </CredenzaBody>
          <CredenzaFooter className="mt-6">
            <CredenzaClose asChild>
              <Button variant={"outline"}>Close</Button>
            </CredenzaClose>
            {!scan && participants && (
              <Button onClick={onSubmit}>Check In</Button>
            )}
          </CredenzaFooter>
        </CredenzaContent>
      </Credenza>
    </>
  );
}
