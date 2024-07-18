"use client";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { cn } from "@/lib/utils";
import MuxPlayer from "@mux/mux-player-react";
import axios from "axios";
import { Loader2, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  chapterId: string;
  title: string;
  courseId: string;
  nextChapterId: string;
  playbackId: string;
  isLocked: boolean;
  completeOnEnd: boolean;
};

const VideoPlayer = ({
  chapterId,
  title,
  courseId,
  nextChapterId,
  playbackId,
  isLocked,
  completeOnEnd,
}: Props) => {
  const [isReady, setIsReady] = useState(false);
  const confetti = useConfettiStore();
  const router = useRouter();
  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        await axios.put(
          `/api/courses/${courseId}/chapters/${chapterId}/progress`,
          {
            isCompleted: true,
          }
        );
        if (!nextChapterId) {
          confetti.onOen();
        }
        toast.success("chapter progress updated");
        router.refresh();
        if (nextChapterId) {
          router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
        }
      }
    } catch (error) {
      toast.error("someting went wrong");
    }
    // 只对没有completed
  };
  return (
    <div className="relative aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
          <Loader2 className=" h-8 w-8 text-secondary animate-spin"></Loader2>
        </div>
      )}
      {isLocked && (
        <div className="flex items-center justify-center bg-slate-800 flex-col gap-y-2 text-secondary absolute inset-0">
          <Lock className="w-8 h-8"></Lock>
          <p> This chapter is locked</p>
        </div>
      )}
      {!isLocked && (
        <MuxPlayer
          title={title}
          className={cn(!isReady && "hidden")}
          onCanPlay={() => setIsReady(true)}
          autoPlay
          playbackId={playbackId}
          onEnded={onEnd}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
