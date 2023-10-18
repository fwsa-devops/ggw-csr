import prisma from '@/lib/prisma';
import { getSession } from 'next-auth/react';

// GET /api/event/[id]/join
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const eventId = searchParams.get('id');

  const session = await getSession();

  if (session?.user?.email === undefined) {
    return new Response('Not authorized session', {
      status: 401,
    });
  }

  console.log('session', session);

  const user = await prisma.user.upsert({
    where: { email: session?.user?.email || '' },
    update: {},
    create: {
      email: session?.user?.email || '',
      name: session?.user?.name || '',
      image: session?.user?.image || '',
    },
  });

  if (!(user && user.email)) {
    return new Response('Not authorized', {
      status: 401,
    });
  }

  if (req.method === 'DELETE') {
    const result = await prisma.eventUser.deleteMany({
      where: {
        eventId,
        userId: user.email,
      },
    });

    return Response.json(result);
  }

  const result = await prisma.eventUser.create({
    data: {
      eventId,
      userId: user.email,
    },
  });

  return Response.json(result);
}
