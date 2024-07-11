import { db } from "@/lib/db";
import { mux } from "@/lib/mux";
import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const courseOwner = await db.course.findUnique({
      where: {
        userId,
        id: params.courseId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const chapter = await db.chapter.findUnique({
      where:{
        id:params.chapterId,
        courseId:params.courseId
      }
    })
    if (!chapter) {
      return new NextResponse("not found", { status: 404 });
    }
    if (chapter.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where:{
          chapterId:params.chapterId
        }
      })
      if (existingMuxData) {
          await mux.video.assets.delete(existingMuxData.assetId)
          await db.muxData.delete({
            where:{
              id:existingMuxData.id
            }
          })
      }
    }
    const deletedChapter = await db.chapter.delete({
      where:{
        id:params.chapterId
      }
    })
    const publishedChaptersInCourse = await db.chapter.findMany({
      where:{
        courseId:params.courseId,
        isPublished:true
      }
    })
    if (!publishedChaptersInCourse.length) {
       await db.course.update({
        where:{
          id:params.courseId
        },
        data:{
          isPublished:false
        }
       })
    }

      return NextResponse.json(deletedChapter)
  } catch (error) {
    console.log("chapter delete error", error);

    return new NextResponse("chapter delete error", { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const reqData = await req.json();
    const courseOwner = await db.course.findUnique({
      where: {
        userId,
        id: params.courseId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await db.chapter.update({
      where: {
        id: params.chapterId,
        courseId: params.courseId,
      },
      data: {
        ...reqData,
      },
    });

    //video
    if (reqData.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: params.chapterId,
        },
      });
      if (existingMuxData) {
        await mux.video.assets.delete(existingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }
      const asset = await mux.video.assets.create({
        input: [{ url: reqData.videoUrl }],
        playback_policy: ["public"],
        test: true,
      });

      if (asset) {
        await db.muxData.create({
          data: {
            chapterId: params.chapterId,
            assetId: asset.id,
            playbackId: asset.playback_ids?.[0]?.id,
          },
        });
      }
    }

    return NextResponse.json(chapter);
  } catch (error) {
    console.log("chapter title update error", error);
    return new Response("chapter tilte update error", {});
  }
}
