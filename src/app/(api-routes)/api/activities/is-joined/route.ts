import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

// GET /api/activities/is-joined
export async function GET(req: Request) {
  const session = await getServerSession();

  const eventUsers = await prisma.eventUser.findMany({
    where: {
      userId: session?.user?.email || '',
    },
  });

  return Response.json(eventUsers && eventUsers.length > 0);
}
