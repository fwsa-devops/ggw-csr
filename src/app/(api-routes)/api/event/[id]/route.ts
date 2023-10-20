import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

// GET /api/event/[id]
// get user event -
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const eventId = searchParams.get('id');

  const session = await getServerSession();

  if (session?.user?.email === undefined) {
    return new Response('Not authorized session', {
      status: 401,
    });
  }

  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email || '' },
  });

  if (!(user && user.email)) {
    return new Response('Not authorized', {
      status: 401,
    });
  }

  const result = await prisma.volunteers.create({
    data: {
      event_id: eventId || '',
      user_id: user.email,
    },
  });

  return Response.json(result);
}
