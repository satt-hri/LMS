const CouresIdPage = ({ params }: { params: { courseId: string } }) => {
  return <div className="flex">{params.courseId}</div>;
};

export default CouresIdPage;
