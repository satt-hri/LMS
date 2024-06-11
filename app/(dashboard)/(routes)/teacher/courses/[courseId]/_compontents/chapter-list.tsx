"use client";

import { Chapter } from "prisma/prisma-client";
import { useEffect, useState } from "react";

import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { Grip, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type ChapterListProps = {
  items: Chapter[] | [];
  onEdit: (id: string) => void;
  onReorder: (updateData: { id: string; position: number }[]) => void;
};
export const ChapterList = ({ items, onEdit, onReorder }: ChapterListProps) => {
  const [chapters, setChapters] = useState(items);
  const [isMounted, setIsMounted] = useState(false);

  //如果不进行是否挂载的判断，会有一些不能拖动等各种问题。
  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    setChapters(items);
  }, [items]);

  if (!isMounted) {
    return null;
  }

  const onDragEnd = (result:DropResult) =>{
    if (!result.destination) {
       return 
    }
   // console.log(result)
    const items = Array.from(chapters);
    const [reorderItem] = items.splice(result.source.index,1);
    items.splice(result.destination.index,0,reorderItem)
    //console.log(result,reorderItem)

    const startIndex = Math.min(result.destination.index,result.source.index)
    const endIndex = Math.max(result.destination.index,result.source.index)

    const updatedChapters = items.slice(startIndex,endIndex+1)

    setChapters(items)

    const bulkUpdatedData = updatedChapters.map((chapter)=>({
        id:chapter.id,
       // title:chapter.title,
        position:items.findIndex((item) => item.id == chapter.id)
    }))
    console.log(bulkUpdatedData)
    onReorder(bulkUpdatedData)
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chapters.map((chapter, index) => (
              <Draggable
                key={chapter.id}
                draggableId={chapter.id}
                index={index}
              >
                {(provided) => (
                  <div
                    className={cn(
                      "flex items-center gap-x-2 bg-slate-200 border-slate-200 border text-slate-700 rounded-md mb-4 text-sm",
                      chapter.isPublished &&
                        "bg-sky-100 border-sky-200 text-sky-700"
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div
                      className={cn(
                        "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                        chapter.isPublished &&
                          "border-r-sky-200 hover:bg-sky-200"
                      )}
                      {...provided.dragHandleProps}
                    >
                      <Grip className="w-5 h-5"></Grip>
                    </div>
                    {chapter.title}
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      {chapter.isFree && <Badge>Free</Badge>}
                      <Badge
                        className={cn(
                          "bg-slate-500",
                          chapter.isPublished && "bg-sky-700"
                        )}
                      >
                        {chapter.isPublished ? "Pbulished" : "Draft"}
                      </Badge>
                      <Pencil
                        className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
                        onClick={() => onEdit(chapter.id)}
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {/* {provided.placeholder} */}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
