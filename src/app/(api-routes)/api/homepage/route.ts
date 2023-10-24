import prisma from "@/lib/prisma"
import { NextResponse } from "next/server";


export async function GET(req: Request) {

  const homepage = await prisma.homepage.findFirst({
    orderBy: {
      updated_at: 'desc'
    },
  });

  return NextResponse.json({ success: true, data: homepage })

}

export async function POST(req: Request) {

  const body = await req.json();
  console.log(body);
  const homepage = await prisma.homepage.create({
    data: body
  })

  return NextResponse.json({ success: true, data: homepage })
} 