"use client";

import { Button } from "@/components/ui/button";
import { UploadButton } from "@/lib/uploadting";
import { Divide, Pencil, PlusCircle, Video } from "lucide-react";
import { useRouter } from "next/navigation";
import { Chapter, MuxData } from "prisma/prisma-client";
import { useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";
import axios from "axios";
import MuxPlayer from "@mux/mux-player-react";

interface Props {
  initialData: Chapter & { muxData?: MuxData | null };
  courseId: string;
}

const formSchema = z.object({
  videoUrl: z.string().min(1),
});
const ChapterVideoForm = ({ initialData, courseId }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggle = () => setIsEditing((current) => !current);

  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      debugger;
      await axios.patch(
        `/api/courses/${courseId}/chapters/${initialData.id}`,
        values
      );
      toast.success("video is updated");
      toggle();
      router.refresh();
    } catch (error) {
      toast.error("video can not update");
    }
  };

  return (
    <div className="mt-6 border rounded-md p-4 bg-slate-100">
      <div className="flex items-center justify-between font-medium">
        Chapter video
        <Button variant={"ghost"} onClick={toggle}>
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" /> Add a video
            </>
          )}
          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" /> Edit video
            </>
          )}
        </Button>
      </div>
      {isEditing && (
        <div>
          <UploadButton
            endpoint={"chapterVideo"}
            onUploadError={(error) => toast.error(error.message)}
            onClientUploadComplete={(data) => {
              if (data[0].url) {
                onSubmit({ videoUrl: data[0].url });
              } else {
                toast.error("chapter video url is not exist");
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Upload this chapter's video
          </div>
        </div>
      )}

      {!isEditing &&
        (!initialData.videoUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <Video className="w-10 h-10 text-slate-500" />
          </div>
        ) : (
          <div className=" relative aspect-video mt-2">
            <MuxPlayer playbackId={initialData.muxData?.playbackId || ""} />
          </div>
        ))}
      {initialData.videoUrl && !isEditing && (
        <div className="text-xs  text-muted-foreground mt-2">
          Videos can take afew minutes to process .Refesh the page if video does
          not appear.
        </div>
      )}
    </div>
  );
};

export default ChapterVideoForm;
