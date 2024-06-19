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
    const chapters = await db.chapter.findFirst({
      where: {
        courseId: params.courseId,
        isPublished: true,
      },
    });

    const requiredFields = [
      course.title,
      course.description,
      course.imageUrl,
      course.price,
      course.categoryId,
      chapters,
    ];
    const isCompleted = requiredFields.every(Boolean);

    if (isCompleted) {
      await db.course.update({
        where: {
          userId,
          id: params.courseId,
        },
        data: {
          isPublished: true,
        },
      });
    } else {
        return new NextResponse("missing required fields",{status:401})
    }
    return NextResponse.json(course);
  } catch (error) {
    //console.log("course publish error", error);
    return new NextResponse("course publish error", { status: 500 });
  }
}
