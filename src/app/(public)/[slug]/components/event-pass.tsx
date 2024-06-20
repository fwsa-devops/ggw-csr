"use client";

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
import GenerateQr from "@/components/shared/generate-qr";
import { Ticket } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  value: string;
  className?: string;
};

export default function EventPass(props: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Credenza open={open} onOpenChange={setOpen}>
        <CredenzaTrigger asChild>
          <Button
            className={cn("w-full", props.className)}
            variant={"default"}
            size={"lg"}
          >
            <Ticket size={16} className="mr-3" />
            Event pass
          </Button>
        </CredenzaTrigger>
        <CredenzaContent className="mb-6 md:w-fit text-center">
          <CredenzaHeader>
            <CredenzaTitle>Scan QR Code</CredenzaTitle>
            <CredenzaDescription className="mt-0!">
              Show this code to the event staff to check in
            </CredenzaDescription>
          </CredenzaHeader>
          <CredenzaBody>
            <div className="mx-auto mb-6 h-fit w-fit">
              <GenerateQr value={props.value} />
            </div>
          </CredenzaBody>
          <CredenzaFooter>
            <CredenzaClose asChild>
              <Button className="mx-auto w-full" variant={"default"}>
                Done
              </Button>
            </CredenzaClose>
          </CredenzaFooter>
        </CredenzaContent>
      </Credenza>
    </>
  );
}