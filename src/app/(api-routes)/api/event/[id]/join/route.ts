import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';

// GET /api/event/[id]/join
export async function GET(req: Request, context: { params }) {
  const eventId = context.params.id;

  const session = await getServerSession();

  if (
    session?.user?.email === undefined ||
    !(session?.user?.email && /^\S+freshworks\.com$/.test(session?.user?.email))
  ) {
    return new Response('Not authorized session', {
      status: 401,
    });
  }

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
  const result = await prisma.volunteers.create({
    data: {
      event_id: eventId,
      user_id: user.email,
    },
  });

  return Response.json(result);
}

// DELETE /api/event/[id]/join
export async function DELETE(req: Request, context: { params }) {
  const eventId = context.params.id;

  const session = await getServerSession();

  if (session?.user?.email === undefined) {
    return new Response('Not authorized session', {
      status: 401,
    });
  }

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

  const result = await prisma.volunteers.deleteMany({
    where: {
      event_id: eventId,
      user_id: user.email,
    },
  });
  return Response.json(result);
}
