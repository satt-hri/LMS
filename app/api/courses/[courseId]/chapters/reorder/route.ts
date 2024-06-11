import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        userId,
        id: params.courseId,
      },
    });

    if (!courseOwner) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { list }: { list: { id: string; position: number }[] } =
      await req.json();

    for (let item of list) {
      await db.chapter.update({
        where: {
          id: item.id,
        },
        data: {
          position: item.position,
        },
      });
    }

    return new NextResponse("chapert reorder suceess", { status: 200 });
  } catch (error) {
    console.log("chapter reorder error", error);
    return new NextResponse("chapter reorder error", { status: 500 });
  }
}
