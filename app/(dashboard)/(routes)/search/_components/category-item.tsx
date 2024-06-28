"use client";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import qs from "query-string";

import { IconType } from "react-icons";

type Props = {
  label: string;
  icon: IconType;
  value: string;
};
export const CategoryItem = ({ label, icon: Icon, value }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategoryId = searchParams.get("categoryId");
  const currentTitle = searchParams.get("title");
  const isSelectd = currentCategoryId === value;

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          title: currentTitle,
          categoryId: isSelectd ? null : value,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push(url);
  };

  return (
    <button
      className={cn(
        "py-2 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700 transition",
        isSelectd && "border-sky-700 bg-sky-200/20 text-sky-800"
      )}
      onClick={onClick}
    >
      <Icon />
      <div className="truncate">{label}</div>
    </button>
  );
};
