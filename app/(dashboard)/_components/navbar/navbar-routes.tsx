"use client";

import SearchInput from "@/components/search-input";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavbarRoutes = () => {
  const pathname = usePathname();
  const isTeacherPage = pathname.startsWith("/teacher");
  const isCoursePage = pathname.includes("/courses");
  const isSearchPage = pathname === "/search";
  return (
    <>
      {isSearchPage && (<div className="hidden md:block">
        <SearchInput />
      </div>)}
      <div className="ml-auto flex gap-x-2">
        {isTeacherPage || isCoursePage ? (
          <Link href={"/"}>
            <Button variant={"ghost"} size={"sm"}>
              <LogOut className="h-4 w-4" />
              Exit 
            </Button>
          </Link>
        ) : (
          <Link href="/teacher/courses">
            <Button size={"sm"} variant={"ghost"}>
              Teacher mode
            </Button>
          </Link>
        )}
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};

export default NavbarRoutes;
