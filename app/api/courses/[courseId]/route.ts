import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import Mux from "@mux/mux-node";
import { utapi } from "../../uploadthing/route";

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }
    const reqData = await req.json();
    const course = await db.course.update({
      where: {
        id: params.courseId,
      },
      data: {
        ...reqData,
      },
    });
    return Response.json(course);
  } catch (error) {
    console.log("course title update error", error);
    return new Response("course title update error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const course = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId,
      },
      include: {
        chapters: {
          include: {
            muxData: true,
          },
        },
      },
    });

    if (!course) {
      return new Response("Not found", { status: 404 });
    }

    for (const chapter of course.chapters) {
      if (chapter.muxData?.assetId) {
        await mux.delete(chapter.muxData?.assetId);
      }
    }


    if (course.imageUrl) {
      let key = course.imageUrl.split("/")?.pop() || "";
     // key =  "6fc92a4c-5aa5-4f97-8f02-c6340eb43dcd-4o63ls.jpg"
      await utapi.deleteFiles(key);
    }

    const deleteCourse = await db.course.delete({
      where: {
        id: params.courseId,
        userId,
      }
    })

    return Response.json(deleteCourse);
  } catch (error) {
    console.log("course title update error", error);
    return new Response("course title update error", { status: 500 });
  }
}
