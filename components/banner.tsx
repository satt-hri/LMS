"use client";

import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { AlertTriangle, CheckCircleIcon } from "lucide-react";

const bannerVariants = cva(
  "border text-center p-4 text-sm flex items-center w-full",
  {
    variants: {
      variant: {
        warning: "bg-yellow-200/80 border-yellow-30 text-primary",
        success: "bg-emerald-700 border-emerald-800 text-secondary",
      },
    },
    defaultVariants: {
      variant: "warning",
    },
  }
);

interface Props extends VariantProps<typeof bannerVariants> {
  label: string;
}

const iconMap = {
  warning: AlertTriangle,
  success: CheckCircleIcon,
};

const Bannder = ({ label, variant }: Props) => {
  const Icon = iconMap[variant || "warning"];
  return (
    <div className={cn(bannerVariants({variant}))}>
      <Icon className="h-4 w-4 mr-2" />
      {label}
    </div>
  );
};

export default Bannder;
