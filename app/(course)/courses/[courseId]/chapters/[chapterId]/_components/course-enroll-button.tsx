"use client";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  courseId: string;
  price: number;
};
const CourseEnrollButton = ({ courseId, price }: Props) => {
  const [isLoading, setIsloading] = useState(false);
  const onClick = async () => {
    try {
      setIsloading(true);
      const response = await axios.patch(`/api/courses/${courseId}/checkout`);
      window.location.assign(response.data.url)
    } catch (error:any) {
      toast.error(error.message)
    } finally {
      setIsloading(false);
    }
  };
  return (
    <Button className="w-full md:w-auto" size="sm" onClick={onClick} disabled={isLoading}>
      Enroll for {formatPrice(price)}
    </Button>
  );
};

export default CourseEnrollButton;
