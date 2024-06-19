"use client";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
};
const Action = ({ disabled, courseId, isPublished }: Props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const confetti = useConfettiStore()

  const onTogglePublish = async () => {
    try {
      setIsLoading(true);
      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast.success("course toggle unpublish success");
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`);
        toast.success("course toggle publish success");
        confetti.onOen()
      }
      router.refresh()
    } catch (error) {
      toast.error("course toggle publish error");
    } finally {
      setIsLoading(false);
    }
  };

  const delCourse = async () => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/courses`);
      toast.success("course  delete success");
      router.push(`/teacher`);
    } catch (error) {
      toast.error("course delete error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        disabled={disabled || isLoading}
        variant={"outline"}
        size={"sm"}
        onClick={onTogglePublish}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={delCourse}>
        <Button size={"sm"} disabled={disabled || isLoading}>
          <Trash className="w-4 h-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};

export default Action;
