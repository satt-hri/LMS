import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import TitleFrom from "./_compontents/title-form";
import DescriptionForm from "./_compontents/description-form";

const CouresIdPage = async ({ params }: { params: { courseId: string } }) => {
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
  });
  if (!course) {
    redirect("/");
  }
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course setup</h1>
          <span className="text-sm text-slate-700">
            Complete all fields(1/5)
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your course</h2>
          </div>
          <TitleFrom courseId={params.courseId} initialData={course} />
          <DescriptionForm courseId={params.courseId} initialData={course} />
        </div>
      </div>
    </div>
  );
};

export default CouresIdPage;