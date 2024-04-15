import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    const { url }: { url: string } = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const courseOwner = await db.course.findUnique({
      where: {
        userId: userId,
        id: params.courseId,
      },
    });

    //console.log(userId,params.courseId,courseOwner)
    if (!courseOwner) {
      return new NextResponse("not Course owner", { status: 401 });
    }
    if (!url.split("/")?.pop()) {
      return new NextResponse("params is  error", { status: 500 });
    }
    const attachment = await db.attachment.create({
      data: {
        url,
        courseId: params.courseId,
        name: url.split("/")?.pop() as string,
      },
    });

    return Response.json(attachment);
  } catch (error) {
    console.log("attachment post error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
