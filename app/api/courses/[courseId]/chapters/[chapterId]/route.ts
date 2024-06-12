import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { courseId: string; chapterId: string } }
) {

    try {
        const {userId} = auth();
        if (!userId) {
            return new NextResponse("Unauthorized",{status:401})
        }
        const reqData = await req.json()
        const courseOwner = await db.course.findUnique({
            where:{
                userId,
                id:params.courseId
            }
        })

        if (!courseOwner) {
            return new NextResponse("Unauthorized",{status:401})
        }

        const chapter =  await db.chapter.update({
            where:{
                id:params.chapterId,
                courseId:params.courseId
            },
            data:{
                ...reqData
            }
        })

        return NextResponse.json(chapter)

    } catch (error) {
        console.log("chapter title update error",error)
        return new Response("chapter tilte update error",{})
    }
}

