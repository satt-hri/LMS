import { db } from "@/lib/db";
import { Course, Purchase } from "prisma/prisma-client";

type PurchaseWithCourse = Purchase & {
  course: Course;
};
const groupByCourse = (purchases: PurchaseWithCourse[]) => {
  const grouped: Record<string, number> = {};

  purchases.forEach((purchase) => {
    const courseTitle = purchase.course.title;
    if (!grouped[courseTitle]) {
      grouped[courseTitle] = 0;
    }
    grouped[courseTitle] += purchase.course.price!;
  });

  return grouped;
};

const getAnalytics = async (userId: string) => {
  const purchases = await db.purchase.findMany({
    where: {
      userId,
    },
    include: {
      course: true,
    },
  });

  const groupedEarnings = groupByCourse(purchases);
  const data = Object.entries(groupedEarnings).map(([courseTitle, total]) => ({
    name: courseTitle,
    total,
  }));

  const totalRevenue = data.reduce((acc,current) => acc + current.total , 0)
};
