
import NavbarRoutes from "@/app/(dashboard)/_components/navbar/navbar-routes";
import { Chapter, Course, UserProgress } from "prisma/prisma-client";
import CourseMobileSiderbar from "./course-mobile-sidebar";

type Props = {
  course: Course & {
    chapters: (Chapter & { userProgresses: UserProgress[] | null })[];
  };
  progressCount: number;
};
const CourseNavbar = ({course,progressCount}: Props) => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <CourseMobileSiderbar course={course} progressCount={progressCount}/>
      <NavbarRoutes />
    </div>
  );
};
export default CourseNavbar;
