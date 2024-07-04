import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { CouseSidebar } from "./course-siderbar";
import { UserProgress, Chapter, Course } from "prisma/prisma-client";
type Props = {
  course: Course & {
    chapters: (Chapter & { userProgresses: UserProgress[] | null })[];
  };
  progressCount: number;
};
const CourseMobileSiderbar = ({ course, progressCount }: Props) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75">
        <Menu  />
      </SheetTrigger>
      <SheetContent className="p-0 bg-white w-72" side={"left"}>
        <CouseSidebar course={course} progressCount={progressCount} />
      </SheetContent>
    </Sheet>
  );
};

export default CourseMobileSiderbar;
