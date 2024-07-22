import { IconBadge } from "@/components/icon-badge";
import { LucideIcon } from "lucide-react";

type Props = {
  icon: LucideIcon;
  label: string;
  numberOfItems: number;
  variant?: "default" | "success";
};
export const InfoCard = ({ icon, label, numberOfItems, variant }: Props) => {
  return (
    <div className="border rounded-md flex items-center gap-x-2 p-3">
      <IconBadge variant={variant} icon={icon} />
      <div>
        <p className="font-medium">{label}</p>
        <p className="text-gray-500 text-sm">{numberOfItems}{numberOfItems === 1 ? "Course":"Courses"}</p>
      </div>
    </div>
  );
};
