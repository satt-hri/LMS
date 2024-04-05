import { Button } from "@/components/ui/button";
import Link from "next/link";

const Course = () => {
  return (
    <div className="p-6">
      <Link href={"/teacher/create"}>
        <Button>create course</Button>
      </Link>
    </div>
  );
};

export default Course;
