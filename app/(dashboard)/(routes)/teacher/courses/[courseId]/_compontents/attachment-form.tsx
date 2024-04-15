"use client";
import { Button } from "@/components/ui/button";
import { UploadButton } from "@/lib/uploadting";
import axios from "axios";
import {
  Divide,
  File,
  ImageIcon,
  Loader2,
  Pencil,
  PlusCircle,
  X,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { Attachment, Course } from "prisma/prisma-client";
import { useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";

interface AttachmentFormProps {
  initialData: Course & {
    attachments: Attachment[];
  };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
});

const AttachmentForm = ({ initialData, courseId }: AttachmentFormProps) => {
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Course is updated");
      toggle();
      router.refresh();
    } catch (error) {
      toast.error("attachment can not update");
    }
  }

  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggle = () => setIsEditing((current) => !current);

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await axios.delete(`/api/courses/${courseId}/attachments/${id}`);
      toast.success("attachments is deleted");
      router.refresh()
    } catch (error) {
      console.log(error);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100  rounded-md p-4">
      <div className="flex items-center justify-between font-medium">
        Course attachment
        <Button variant={"ghost"} onClick={toggle}>
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="w-4 h-4 mr-2" /> Add an attachment
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="w-4 h-4 mr-2" /> Edit attachment
            </>
          )}
        </Button>
      </div>

      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">
              no attachment yet
            </p>
          )}
          {initialData.attachments.length > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex items-center p-3 w-full bg-sky-100 border-sky-200 rounded-md border text-sky-700"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="text-xs line-clamp-1">{attachment.name}</p>
                  {deletingId === attachment.id && (
                    <div>
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </div>
                  )}
                  {deletingId !== attachment.id && (
                    <button
                      className="ml-auto hover:opacity-75"
                      onClick={() => onDelete(attachment.id)}
                    >
                      <X className="w-4 h-4 " />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <UploadButton
            endpoint="courseAttachment"
            onClientUploadComplete={(data) => {
              if (data[0].url) {
                onSubmit({ url: data[0].url });
              } else {
                toast.error(" url is not exist");
              }

              // console.log(data)
              // alert(data[0].url);
            }}
            onUploadError={(error) => toast.error(error.message)}
          />
          <div className="text-xs text-muted-foreground mt-4">
            add anything your course attachment
          </div>
        </div>
      )}
    </div>
  );
};

export default AttachmentForm;
