"use client"

import { Category } from "prisma/prisma-client";

import {
  FcEngineering,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
} from "react-icons/fc";
import { IconType } from "react-icons";
import { CategoryItem } from "./category-item";

type Props = {
  items: Category[];
};

const iconMap: Record<Category["name"], IconType> = {
  "Computer Science": FcMultipleDevices,
  "Music": FcMusic,
  "Fitness": FcSportsMode,
  "Photography": FcOldTimeCamera,
  "Accounting": FcSalesPerformance,
  "Filming": FcFilmReel,
  "Engineering":FcEngineering
};

export const Categorises = ({ items }: Props) => {
  return (
    <div className="flex items-center gap-x-2 pb-2 overflow-x-auto">
      {items.map((item) => (
        <CategoryItem key={item.id} label={item.name} icon={iconMap[item.name]} value={item.id}/>
      ))}
    </div>
  );
};
