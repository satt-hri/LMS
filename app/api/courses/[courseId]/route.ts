import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

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
