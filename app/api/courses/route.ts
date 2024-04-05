import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { title } = await req.json();
    const { userId } = auth();
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }
    const course = await db.course.create({
      data: {
        userId,
        title,
      },
    });

    return Response.json(course);
  } catch (error) {
    return new Response("Course post  error", { status: 500 });
  }
}
