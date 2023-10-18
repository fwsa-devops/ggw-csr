import prisma from '@/lib/prisma';

// GET /api/tags
// return all tags
export async function GET(req: Request) {
  const tags = await prisma.tag.findMany();
  return Response.json(tags);
}
