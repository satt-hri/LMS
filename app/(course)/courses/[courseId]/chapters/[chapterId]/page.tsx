import { GetChapter } from "@/actions/get-chapter";
import Bannder from "@/components/banner";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import VideoPlayer from "./_components/video-player";
import CourseEnrollButton from "./_components/course-enroll-button";

const ChapterIdPage = async ({
  params,
}: {
  params: { courseId: string; chapterId: string };
}) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }

  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await GetChapter({
    userId,
    courseId: params.courseId,
    chapterId: params.chapterId,
  });

  if (!chapter || !course) {
    redirect("/");
  }

  const isLocked = !purchase && !chapter.isFree;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div>
      {userProgress?.isCompleted && (
        <Bannder
          variant={"success"}
          label="YOu already completed this chapter"
        ></Bannder>
      )}
      {isLocked && (
        <Bannder
          variant={"warning"}
          label="You need to purchase this course to watch this chapter"
        />
      )}
      <div className="flex  flex-col mx-auto pb-20 max-w-4xl">
        <div className="p-4">
          <VideoPlayer
            chapterId={params.chapterId}
            title={chapter.title}
            courseId={params.courseId}
            nextChapterId={nextChapter?.id!}
            playbackId={muxData?.playbackId!}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <div className="p-4 flex-col md:flex-row items-center justify-center">
          <h2 className="text-2xl font-semibold  mb-2">{chapter.title}</h2>
          {purchase ? <div></div> : <CourseEnrollButton courseId={params.courseId} price={course.price!} />}
        </div>
      </div>
    </div>
  );
};
export default ChapterIdPage;
