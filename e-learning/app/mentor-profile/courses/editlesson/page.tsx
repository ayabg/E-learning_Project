"use server"
import MentorProfileSidebar from "@/components/sidebars/MentorProfileSidebar";
import { useDropzone } from "react-dropzone";
import image from "@/components/Images/Courses/UI.png";
import { CaptionsIcon, CircleDollarSignIcon, CompassIcon, LanguagesIcon, PencilLineIcon, PenSquareIcon, PlusCircle, Trash2Icon, UserPenIcon } from "lucide-react";
import DragAndDrop from "@/components/Inputs/DragAndDrop";
import CourseThumbnailDragAndDrop from "@/components/Inputs/CourseThumbnailDragAndDrop";
import MentorEditCourseAccordion from "@/components/Accordions/MentorEditCourseAccordion";
import { getParams } from "@/lib/util/params";
import { headers } from "next/headers";
import EditLessonPage from "@/components/pages/EditLessonPage";
import prisma from "@/lib/util/db";

async function EditLesson() {

  const headerlist = headers()
  const pathname = headerlist.get("x-current-path")
  const params: URLSearchParams = getParams(pathname)
  const lessonid = params.get("lessonid") as string
  const coursename = params.get("coursename") as string
  const lessonname = params.get("lessonname") as string

  const lesson = await prisma.lesson.findUnique({where: {id: lessonid}, include: {chapters: true, quiz: {include: {questions: true}}}})

  if(!lesson){
    return <div>Lesson not found</div>
  }

  return (
    <div className="w-full mb-6 flex">
      <MentorProfileSidebar />
      <div className="w-full h-full max-md:p-2 p-12 bg-[#C0C0C0]/15">
        <h1 className="text-xl font-extrabold tracking-tight text-gray-900 max-md:text-lg md:pl-8">
          My Courses &gt; {" "}
          <span>
            {coursename}
          </span>
          {" "} &gt; {" "}
          <span className="text-violet-600">
            {lessonname}
          </span>
        </h1>
        <EditLessonPage lesson={lesson} />
      </div>
    </div>
  )
}

export default EditLesson