import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

type Props = {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
};
const Action = ({ disabled, courseId, isPublished }: Props) => {
  return (
    <div className="flex items-center gap-x-2">
      <Button disabled={disabled} variant={"outline"} size={"sm"} >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <Button size={"sm"}>
        <Trash  className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default Action;
