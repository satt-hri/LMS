import { db } from "@/lib/db";
import { Category, Chapter, Course } from "prisma/prisma-client";
import { getProgress } from "./get-progress";

type CourseWithProgressWithCategroy = Course & {
  category: Category;
  chapters: Chapter[];
  progress: number | null;
};

type DashboardCourese = {
  completedCourses: CourseWithProgressWithCategroy[];
  coursesInProgress: CourseWithProgressWithCategroy[];
};

export const getDashboradCourses = async (
  userId: string
): Promise<DashboardCourese> => {
  try {
    const purchasedCourses = await db.purchase.findMany({
      where: {
        userId,
      },
      include: {
        course: {
          include: {
            chapters: true,
            category: true,
          },
        },
      },
    });
    //console.log(purchasedCourses)
    const courses = purchasedCourses.map(
      (purchase) => purchase.course
    ) as CourseWithProgressWithCategroy[];
    // 草 很久不用了 in  of 的区别都忘接了
    for (const course of courses) {
      const progress = await getProgress(userId, course.id);
      course["progress"] = progress;
    }
    //console.log(courses)
    const completedCourses = courses.filter(
      (course) => course.progress === 100
    );
    const coursesInProgress = courses.filter(
      (course) => (course.progress ?? 0) < 100
    );
    return {
      completedCourses,
      coursesInProgress,
    };
  } catch (error) {
    return {
      completedCourses: [],
      coursesInProgress: [],
    };
  }
};
