
import { db } from "@/lib/db";
import { isTeacher } from "@/lib/teacher";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; attachmentId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId || !isTeacher(userId)) {
      return new NextResponse("unauthorized", {status:401});
    }

    const courseOwner = await db.course.findUnique({
      where: {
        userId: userId,
        id: params.courseId,
      },
    });
    if (!courseOwner) {
      return new NextResponse("not Course owner", { status: 401 });
    }

    const attachment = await db.attachment.delete({
      where:{
        courseId:params.courseId,
        id:params.attachmentId
      }
    })

    //ファイルの削除
    const  utapi = new UTApi();
    await utapi.deleteFiles(attachment.name)


    return NextResponse.json(attachment)

  } catch (error) {
    console.log("attachment can deltet ", error);
    return new NextResponse("attachment can deltet ", { status: 500 });
  }
}
