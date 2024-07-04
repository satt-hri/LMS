import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { Course, UserProgress, Chapter } from "prisma/prisma-client";
import { CourseSidebarItem } from "./course-sidebar-item";

type Props = {
  course: Course & {
    chapters: (Chapter & { userProgresses: UserProgress[] | null })[];
  };
  progressCount: number;
};
export const CouseSidebar = async ({ course, progressCount }: Props) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
    },
  });
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm ">
      <div className="p-8 flex flex-col border-b">
        <h1 className="font-semibold">{course.title}</h1>
      </div>
      <div className="w-full flex flex-col">
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgresses?.[0]?.isCompleted}
            isLocked={!purchase && !chapter.isFree}
            courseId = {course.id}
          />
        ))}
      </div>
    </div>
  );
};
