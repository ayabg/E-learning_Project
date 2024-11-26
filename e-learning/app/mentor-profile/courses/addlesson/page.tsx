import { getParams } from "@/lib/util/params";
import { headers } from "next/headers";
import MentorProfileSidebar from "@/components/sidebars/MentorProfileSidebar";
import MentorAddCourseClient from "@/components/pages/MentorAddCourseClient";

function AddLesson() {
  
  const headerlist = headers()
  const pathname = headerlist.get("x-current-path")
  const params: URLSearchParams = getParams(pathname)
  const coursename = params.get("coursename") as string  
  const courseid = params.get("courseid") as string  

  return (
    <div className="w-full mb-6 flex">
      <MentorProfileSidebar />
      <div className="w-full h-full max-md:p-2 p-12 bg-[#C0C0C0]/15">
        <MentorAddCourseClient coursename={coursename} courseid={courseid} />
      </div>
    </div>
  )
}

export default AddLesson