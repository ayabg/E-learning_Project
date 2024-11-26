"use server";
import MentorProfileSidebar from "@/components/sidebars/MentorProfileSidebar";
import React from "react";
import { getParams } from "@/lib/util/params";
import { headers } from "next/headers";
import EditCoursePageMentor from "@/components/pages/EditCoursePageMentor";
import prisma from "@/lib/util/db";
 
async function Course() {
  const headerlist = headers()
  const pathname = headerlist.get("x-current-path")
  const params: URLSearchParams = getParams(pathname)
  const id = params.get("id") as string
  
  const course = await prisma.course.findUnique({where: {id: id}, include: {lessons: {include: {quiz: true, chapters: true}}}})
  
  return (
    <div className="w-full mb-6 flex">
      <MentorProfileSidebar />
      <div className="w-full h-full max-md:p-2 p-12 bg-[#C0C0C0]/15">
        <h1 className="text-xl font-extrabold tracking-tight text-gray-900 max-md:text-lg md:pl-8">
          My Courses &gt;{" "}
          <span className="text-violet-600">
            {course?.title}
          </span>
        </h1>
        <EditCoursePageMentor course={course} />
      </div>
    </div>
  );
}

export default Course;
