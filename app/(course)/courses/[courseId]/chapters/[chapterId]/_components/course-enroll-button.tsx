import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";

type Props = {
    courseId:string;
    price:number
}
 const CourseEnrollButton = ({courseId,price}: Props) => {
    return ( 
        <Button className="w-full md:w-auto">
            Enroll for {formatPrice(price)}
        </Button>
    );
}

export default CourseEnrollButton