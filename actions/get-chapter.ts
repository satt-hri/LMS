import { db } from "@/lib/db";
import { Attachment, Chapter, UserProgress } from "prisma/prisma-client";

type Props = {
  userId: string;
  courseId: string;
  chapterId: string;
};
export const GetChapter = async ({ userId, courseId, chapterId }: Props) => {
  try {
    const purchase = await db.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    const course = await db.course.findUnique({
      where: {
        isPublished: true,
        id: courseId,
      },
      select: {
        price: true,
      },
    });

    const chapter = await db.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      },
    });
    if (!chapter || !course) {
      throw new Error("chapter or course not found");
    }
    let muxData = null,
      attachments: Attachment[] = [],
      nextChapter: Chapter | null = null,
      userProgress: UserProgress | null = null;

    if (purchase) {
      attachments = await db.attachment.findMany({
        where: {
          courseId,
        },
      });
    }else{
      //テスト用
      // await db.purchase.create({
      //   data: {
      //     courseId,
      //     userId,
      //   },
      // });
    }

    if (purchase || chapter.isFree) {
      muxData = await db.muxData.findUnique({
        where: {
          chapterId,
        },
      });

      nextChapter = await db.chapter.findFirst({
        where: {
          courseId,
          isPublished: true,
          position: {
            gt: chapter.position,
          },
        },
        orderBy: {
          position: "asc",
        },
      });
    }

    userProgress = await db.userProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        },
      },
    });

    return {
      chapter,
      course,
      muxData,
      attachments,
      nextChapter,
      userProgress,
      purchase,
    };
  } catch (error) {
    console.log("get-chapter-action-error", error);
    return {
      chapter: null,
      course: null,
      muxData: null,
      attachments: [],
      nextChapter: null,
      userProgress: null,
      purchase: null,
    };
  }
};
