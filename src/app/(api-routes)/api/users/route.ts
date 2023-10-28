import prisma from '@/lib/prisma';

// GET /api/users
// return all users
export async function GET(req: Request) {
  const tags = await prisma.user.findMany();
  return Response.json(tags);
}
