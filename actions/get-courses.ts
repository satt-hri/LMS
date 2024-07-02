import { db } from "@/lib/db";
import { Category, Course,  Purchase } from "prisma/prisma-client";
import { getProgress } from "./get-progress";

type CourseWithProgressWithCategroy = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
 // purchases:Purchase[]
};

type GetCourses = {
  userId: string;
  title?: string;
  categoryId?: string;
};

export const getCourses = async ({
  userId,
  title,
  categoryId,
}: GetCourses): Promise<CourseWithProgressWithCategroy[]> => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        categoryId,
        title: {
          contains: title,
        },
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
        purchases: {
          where: {
            userId,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const courseWithProgress:CourseWithProgressWithCategroy[] =
      await Promise.all(courses.map( async course => {
        
         if (course.purchases.length === 0) {
            return {
                ...course,
                progress:null
            }
         }
         const progressPercentage = await getProgress(userId,course.id)
         return {
            ...course,
            progress:progressPercentage
         }
      }));

    return courseWithProgress;
  } catch (error) {
    console.log("getCourses", error);
    return [];
  }
};
