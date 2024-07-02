import { db } from "@/lib/db";
import { Categorises } from "./_components/categorises";
import SearchInput from "@/components/search-input";
import { auth } from "@clerk/nextjs";
import { getCourses } from "@/actions/get-courses";
import { redirect } from "next/navigation";
import { CoursesList } from "@/components/courses-list";
const Search = async ({
  searchParams,
}: {
  searchParams: { title?: string; categoryId?: string };
}) => {
  const categroys = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  // const title = searchParams.title;
  // const categoryId = searchParams.categoryId;
  const courses = await getCourses({ userId, ...searchParams });

  return (
    <>
      <div className="px-6 pt-6 block md:hidden md:mb-0">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categorises items={categroys} />
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default Search;
