type Props = {
 
}
 const ChapterIdPage = ({params}: {params:{courseId:string,chapterId:string}}) => {
    return ( 
        <div>   
            {params.chapterId} / {params.courseId}
        </div>
    );
}
export default ChapterIdPage