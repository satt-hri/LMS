import { db } from "@/lib/db";
import { Categorises } from "./_components/categorises";
const Search = async () => {
  const categroys = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return <div className="p-6">
    <Categorises items={categroys} />
  </div>;
};

export default Search;
