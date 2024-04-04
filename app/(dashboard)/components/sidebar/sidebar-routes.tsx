"use client";
import { BarChart, Compass, Layout, List } from "lucide-react";
import SidebarItem from "./sidebar-item";
import { usePathname } from "next/navigation";

const guestRoutes = [
  { icon: Layout, label: "Dashboard", href: "/" },
  { icon: Compass, label: "Browse", href: "/search" },
];

const teacherRoutes = [
  { icon: List, label: "Courses", href: "/teacher/courses" },
  { icon: BarChart, label: "Analytics", href: "/teacher/analytics" },
];

const SidebarRoutes = () => {
  const pathname = usePathname();
  const isTeacherPage = pathname.includes("/teacher");
  const routes = isTeacherPage ? teacherRoutes : guestRoutes;
  return (
    <div className="flex w-full flex-col">
      {routes.map((route, _i) => (
        <SidebarItem key={_i} {...route} />
      ))}
    </div>
  );
};

export default SidebarRoutes;
