/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import logger from "@/lib/logger";
import { Button } from "@/components/ui/button";
import { type User } from "@prisma/client";
import { Download } from "lucide-react";
import { type IEvent } from "@/server/model";

type Props = {
  event: IEvent;
  participants: { User: User }[];
};

export default function ExportParticipants(props: Props) {
  const { participants } = props;
  logger.info("ExportParticipants");
  logger.debug(participants);

  const exportParticipants = () => {
    logger.info("Exporting participants");
    const workbook = XLSX.utils.book_new();
    const participantsSheet = XLSX.utils.json_to_sheet(
      participants.map((participant) => participant.User),
    );
    XLSX.utils.book_append_sheet(workbook, participantsSheet, "Participants");
    const file = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    const blob = new Blob([file], {
      type: "application/octet-stream",
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    void saveAs(blob, `${props.event.title} - participants.xlsx`);
  };

  return (
    <>
      <Button variant={"secondary"} size={"icon"} onClick={exportParticipants}>
        <Download className="h-5 w-5" />
      </Button>
    </>
  );
}
