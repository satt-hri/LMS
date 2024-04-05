"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
/**
 * ないとuseFormを使えない
 */
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { Course } from "prisma/prisma-client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface TitleFromProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: "title is  required",
  }),
});

const TitleFrom = ({ initialData, courseId }: TitleFromProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: initialData.title },
  });
  const { isValid, isSubmitting } = form.formState;

  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast.success("title is updated");
      toggle();
      router.refresh();
    } catch (error) {
      toast.error("title can not update");
    }
  }

  const [isEditing, setIsEditing] = useState(false);
  const toggle = () => setIsEditing((current) => !current);
  return (
    <div className="mt-6 border bg-slate-100  rounded-md p-4">
      <div className="flex items-center justify-between font-medium">
        Course title
        <Button variant={"ghost"} onClick={toggle}>
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="w-4 h-4 mr-4" />
              Edit title
            </>
          )}
        </Button>
      </div>
      {!isEditing && <p className="text-sm mt-2">{initialData.title}</p>}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input disabled={isSubmitting} {...field}></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={isSubmitting || !isValid}>save</Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default TitleFrom;
