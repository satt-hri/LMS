import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { ArrowLeft, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import ChapterTitleForm from "./_compontents/chapter-title-form";
import ChapterDescriptionForm from "./_compontents/chapter-description-form";

type Props = {
  params: {
    courseId: string;
    chapterId: string;
  };
};
const ChapterIdPage = async ({ params }: Props) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
  });
  if (!chapter) {
    return redirect("/");
  }

  const requiredFields = [
    chapter.title,
    chapter.description,
    //chapter.
  ];

  const totalFields = requiredFields.length;
  const completedFileds = requiredFields.filter(Boolean).length;
  const complettionText = `(${completedFileds}/${totalFields})`;
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="w-full">
          <Link
            href={`/teacher/courses/${params.courseId}`}
            className="flex items-center text-sm  hover:opacity-75 mb-6 transition "
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to couse setup
          </Link>
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-2xl font-medium">Chapter Creation</h1>
              <span className="text-sm text-slate-700">Complete all fields {complettionText}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
            <div>
                <div className="flex items-center gap-x-2">
                    <IconBadge icon={LayoutDashboard}/>
                    <h2 className="text-xl">Customize your chapter</h2>
                </div>
                <ChapterTitleForm initialData={chapter} courseId={params.courseId} />
                <ChapterDescriptionForm  initialData={chapter} courseId={params.courseId} />
            </div>
        </div>
        <div className="space-y-4">
            <div>
                <div className="flex items-center gap-x-2">
                    <IconBadge icon={LayoutDashboard}/>
                    <h2 className="text-xl">Customize your chapter</h2>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterIdPage;
