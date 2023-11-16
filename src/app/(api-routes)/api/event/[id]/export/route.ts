import { exportEventData } from '@/components/actions/action';
import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';

export async function GET(req: Request, context: { params }) {
  // Your JSON data
  const eventId = context.params.id;
  // console.log(eventId);

  if (!eventId) {
    return new Response('Invalid Event Id');
  }

  const jsonData = await exportEventData(eventId as string);

  // Convert JSON to Excel
  const workBook = XLSX.utils.book_new();

  // Create the Activity sheet
  const activitySheet = XLSX.utils.json_to_sheet([jsonData!.activity]);
  XLSX.utils.book_append_sheet(workBook, activitySheet, 'Activity');

  const eventSheet = XLSX.utils.json_to_sheet([jsonData?.event]);
  XLSX.utils.book_append_sheet(workBook, eventSheet, 'Event');

  // Create the Volunteers sheet
  const volunteersSheet = XLSX.utils.json_to_sheet(jsonData?.volunteer as any);
  XLSX.utils.book_append_sheet(workBook, volunteersSheet, 'Volunteers');

  // Create the Feedbacks sheet
  const feedbacksSheet = XLSX.utils.json_to_sheet(jsonData?.feedbacks as any);
  XLSX.utils.book_append_sheet(workBook, feedbacksSheet, 'Feedbacks');

  const wbout = XLSX.write(workBook, { bookType: 'xlsx', type: 'binary' });

  const buffer = Buffer.from(wbout, 'binary');

  const readableStream = new ReadableStream({
    start(controller) {
      controller.enqueue(buffer);
      controller.close();
    },
  });

  const response = new NextResponse(readableStream, {
    status: 200,
    headers: new Headers({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    }),
  });

  return response;
}
