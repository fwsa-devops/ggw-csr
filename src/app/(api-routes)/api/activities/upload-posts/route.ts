import prisma from '@/lib/prisma';

// POST /api/filter
// return filtered activities
export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const activityId = searchParams.get('activity_id');

  const imageUrls = await req.json();
  const data = imageUrls.map((imageUrl) => ({
    url: imageUrl,
    activity_id: activityId,
  }));

  const response = await prisma.posts.createMany({
    data,
  });

  if (response.count > 0) {
    return Response.json({ success: true, data: 'success' });
  } else {
    return Response.json({ status: 500, error: 'server error' });
  }
}
