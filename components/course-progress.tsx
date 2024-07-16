import { cn } from "@/lib/utils";
import { Progress } from "./ui/progress";

type Props = {
  value: number;
  variant?: "default" | "success";
  size?: "default" | "sm";
};

const colorByVariant = {
  default: "text-sky-700",
  success: "text-emerald-700",
};

const sizeByVariant = {
  default: "text-sm",
  sm: "text-xs",
};

export const CourseProgress = ({ value, variant, size }: Props) => {
  return (
    <div>
      <Progress value={value} variant={variant} className="h-2" />
      <p
        className={cn(
          "font-medium mt-2 text-sky-700",
          sizeByVariant[size || "default"],
          colorByVariant[variant || "default"]
        )}
      >{Math.round(value)} % Complete</p>
    </div>
  );
};
