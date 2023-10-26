import prisma from '@/lib/prisma';

// POST /api/filter
// return filtered activities
export async function POST(req: Request) {
  const imageUrls = await req.json();
  console.log('imageUrls', imageUrls);
  

  return Response.json({});
}
