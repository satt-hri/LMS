import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const course = await db.course.findUnique({
      where: {
        userId,
        id: params.courseId,
      },
    });

    if (!course) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const updatedCourse = await db.course.update({
      where: {
        userId,
        id: params.courseId,
      },
      data: {
        isPublished: false,
      },
    });

    return NextResponse.json(updatedCourse);
  } catch (error) {
    //console.log("course publish error", error);
    return new NextResponse("course publish error", { status: 500 });
  }
}
