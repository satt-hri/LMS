import { IconBadge } from "@/components/icon-badge";
import { db } from "@/lib/db";
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";
import { redirect } from "next/navigation";
import TitleFrom from "./_compontents/title-form";
import DescriptionForm from "./_compontents/description-form";
import ImageForm from "./_compontents/image-form";
import CategoryForm from "./_compontents/category-form";
import PriceForm from "./_compontents/price-form";
import AttachmentForm from "./_compontents/attachment-form";
import { auth } from "@clerk/nextjs";
import ChapterForm from "./_compontents/chapter-form";

const CouresIdPage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!course) {
    return redirect("/");
  }

  const categroy = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });


  const requiredFields =[
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId
  ]

  const totalFields = requiredFields.length;
  const completedFileds = requiredFields.filter(Boolean).length
  const complettionText = `(${completedFileds}/${totalFields})`

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course setup</h1>
          <span className="text-sm text-slate-700">
            Complete all fields {complettionText}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your course</h2>
          </div>
          <TitleFrom courseId={params.courseId} initialData={course} />
          <DescriptionForm courseId={params.courseId} initialData={course} />
          <ImageForm courseId={params.courseId} initialData={course} />
          <CategoryForm
            courseId={params.courseId}
            initialData={course}
            options={categroy.map((item) => ({
              label: item.name,
              value: item.id,
            }))}
          />
        </div>
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={ListChecks} />
              <h2 className="text-xl">Coures chapters</h2>
            </div>
            <ChapterForm courseId={params.courseId} initialData={course} />
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={CircleDollarSign} />
              <h2 className="text-xl">Sell your course</h2>
            </div>
            <PriceForm courseId={params.courseId} initialData={course} />
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={File} />
              <h2>Resources & Attachments</h2>
            </div>
            <AttachmentForm courseId={params.courseId} initialData={course} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouresIdPage;
