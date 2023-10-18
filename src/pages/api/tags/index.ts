import prisma from '@/lib/prisma';

// GET /api/tags
// return all tags
export default async function handle(req, res) {
  if (req.method === 'GET') {
    const tags = await prisma.tag.findMany();

    res.json(tags);
  }
}
