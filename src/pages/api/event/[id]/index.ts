import prisma from '@/lib/prisma';
import { getSession } from 'next-auth/react';

// GET /api/event/[id]
// get user event -
export default async function handle(req, res) {
  // const { eventId } = req.body;
  const eventId = req.query.id;

  const session = await getSession({ req });

  if (session?.user?.email === undefined) {
    return res.status(401).json({ error: 'Not authorized' });
  }

  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email || '' },
  });

  if (!(user && user.email)) {
    return res.status(401).json({ error: 'Not authorized' });
  }

  const result = await prisma.eventUser.create({
    data: {
      eventId,
      userId: user.email,
    },
  });

  res.json(result);
}
