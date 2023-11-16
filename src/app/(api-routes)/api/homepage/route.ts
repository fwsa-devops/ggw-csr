import { ResponseType } from '@/components/actions/action';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const homepage = await prisma.homepage.findFirst({
    orderBy: {
      updated_at: 'desc',
    },
  });

  return NextResponse.json({ success: true, data: homepage });
}

export async function POST(req: Request) {
  const body = await req.json();

  try {
    const homepage = await prisma.homepage.create({
      data: body,
    });
    // console.log(homepage);

    const res: ResponseType = {
      success: true,
      message: 'Successfully Submitted Homepage',
    };

    return NextResponse.json(res);
  } catch (error) {
    // console.log(error);

    const res: ResponseType = {
      success: false,
      message: 'Failed to Submitted Homepage',
      errors: {
        error: error as string,
      },
    };
    return NextResponse.json(res);
  }
}
