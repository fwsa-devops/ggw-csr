import { unregisterEvent } from '@/server/service/registration.service';
import { redirect } from 'next/navigation';

export default async function Register({
  params,
}: {
  params: { eventId: string };
}) {
  const { eventId } = params;

  if (!eventId) {
    return (
      <>
        <h2>Event not found</h2>
        <p>
          <a href="/home">Go back</a>
        </p>
      </>
    );
  }

  await unregisterEvent(eventId);
  // revalidatePath(`/e/${eventId}`);
  redirect(`/e/${eventId}`);
}
