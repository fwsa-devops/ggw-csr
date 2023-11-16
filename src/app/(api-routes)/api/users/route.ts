import prisma from '@/lib/prisma';

// GET /api/users
// return all users
export async function GET() {
  // need to filter through roles
  const users = await prisma.user.findMany();
  return Response.json(users);
}
