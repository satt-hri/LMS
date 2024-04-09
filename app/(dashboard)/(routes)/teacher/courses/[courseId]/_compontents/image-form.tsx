"use client";
import { Button } from "@/components/ui/button";
import { UploadButton } from "@/lib/uploadting";
import axios from "axios";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Course } from "prisma/prisma-client";
import { useState } from "react";
import toast from "react-hot-toast";
import { z } from "zod";

interface ImageFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "image is  required",
  }),
});

const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("image is updated");
      toggle();
      router.refresh();
    } catch (error) {
      toast.error("image can not update");
    }
  }

  const [isEditing, setIsEditing] = useState(false);
  const toggle = () => setIsEditing((current) => !current);
  return (
    <div className="mt-6 border bg-slate-100  rounded-md p-4">
      <div className="flex items-center justify-between font-medium">
        Course image
        <Button variant={"ghost"} onClick={toggle}>
          {isEditing && <>Cancel</>}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="w-4 h-4 mr-2" /> Add an image
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="w-4 h-4 mr-2" /> Edit image
            </>
          )}
        </Button>
      </div>

      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              src={initialData.imageUrl}
              alt="Upload"
              fill
              className="object-cover rounded-md"
            ></Image>
          </div>
        ))}
      {isEditing && (
        <div>
          <UploadButton
            endpoint="courseImage"
            onClientUploadComplete={(data) => {
              if (data[0].url) {
                onSubmit({ imageUrl: data[0].url });
              } else {
                toast.error("image url is not exist");
              }

              // console.log(data)
              // alert(data[0].url);
            }}
            onUploadError={(error) => toast.error(error.message)}
          />
        </div>
      )}
    </div>
  );
};

export default ImageForm;
