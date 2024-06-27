import { db } from "@/lib/db";
import { Categorises } from "./_components/categorises";
import SearchInput from "@/components/search-input";
const Search = async () => {
  const categroys = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return <>
    <div className="px-6 pt-6 block md:hidden md:mb-0">
      <SearchInput />
    </div>
    <div className="p-6">
      <Categorises items={categroys} />
    </div>
  </>;
};

export default Search;
