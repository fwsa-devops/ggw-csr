import prisma from '@/lib/prisma';
import { getSession } from 'next-auth/react';

// GET /api/event/[id]/join
export default async function handle(req, res) {
  // const { eventId } = req.body;
  const eventId = req.query.id;

  const session = await getSession({ req });

  if (session?.user?.email === undefined) {
    return res.status(401).json({ error: 'Not authorized' });
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
    return res.status(401).json({ error: 'Not authorized' });
  }

  if (req.method === 'DELETE') {
    const result = await prisma.eventUser.deleteMany({
      where: {
        eventId,
        userId: user.email,
      },
    });

    return res.json(result);
  }

  const result = await prisma.eventUser.create({
    data: {
      eventId,
      userId: user.email,
    },
  });

  res.json(result);
}
