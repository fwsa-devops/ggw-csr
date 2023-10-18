import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

// GET /api/event/[id]
// get user event -
export default async function GET(req: Request) {
  // const { eventId } = req.body;
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

  const result = await prisma.eventUser.create({
    data: {
      eventId,
      userId: user.email,
    },
  });

  return Response.json(result);
}
