'use client';

import { Button } from '@/components/ui/button';
import { FileDownIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ExportButton = ({ eventId }: { eventId: string }) => {
  const router = useRouter();

  const downloadFile = () => {
    router.push(`/api/event/${eventId}/export`);
  };

  // const downloadFile = async () => {
  //   const content = await  exportEventData(eventId);
  //   const a = document.createElement("a");
  //   const file = new Blob([content ?? ''], { type: "application/csv" });
  //   a.href = URL.createObjectURL(file);
  //   a.download = `${eventId} - ${new Date().toISOString()}.csv`;
  //   a.click();
  // }

  return (
    <>
      <Button variant={'default'} onClick={downloadFile}>
        <FileDownIcon size={18} className="mr-3" />
        CSV Export
      </Button>
    </>
  );
};

export default ExportButton;
