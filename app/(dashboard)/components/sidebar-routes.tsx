"use client";
import { Compass, Layout } from "lucide-react";
import SidebarItem from "./sidebar-item";

const getstRoutes = [
  { icon: Layout, label: "Dashboard", href: "/" },
  { icon: Compass, label: "Browse", href: "/search" },
];
const SidebarRoutes = () => {
  const routes = getstRoutes;
  return (
    <div className="flex w-full flex-col">
      {routes.map((route, _i) => (
        <SidebarItem
          key={_i}
          {...route}
          //   icon={route.icon}
          //   label={route.label}
          //   href={route.href}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;
