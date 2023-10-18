import prisma from '@/lib/prisma';

// GET /api/activities/is-joined
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const activityId = searchParams.get('activityId');

  // get user email from session

  const user = await prisma.user.findUnique({
    where: {
      email: '',
    },
    include: {
      activites: true,
    },
  });
  return Response.json(user?.activites && user?.activites.length > 0);
}
