import { findById } from '@/server/service/event.service';
import { EventValidator } from '@/server/validation/events.validator';
import ManageEventDetails from './components/manage-event';

export default async function Page({
  params,
}: {
  params: { eventId: string };
}) {
  await EventValidator.checkUserIsEventOrganizer(params.eventId);

  const event = await findById(params.eventId);

  return (
    <>
      <div className="flex-1 space-y-8 pt-6 md:p-8">
        <ManageEventDetails event={event} />
      </div>
    </>
  );
}
