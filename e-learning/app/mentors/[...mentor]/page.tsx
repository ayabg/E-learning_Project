"use server"
import CoursesPageCourseCard from '@/components/Cards/CoursesPageCourseCard'
import { getParams } from '@/lib/util/params'
import { headers } from 'next/headers'
import prisma from '@/lib/util/db'
import MentorCourses from '@/components/pages/MentorCourses'
import MentorClientPage from '@/components/Cards/MentorClientPage'

async function Mentor() {
    const headerlist = headers()
    const pathname = headerlist.get("x-current-path")
    const params: URLSearchParams = getParams(pathname)
    const id = params.get("id") as string
    const user = await prisma.user.findFirst({
      where: {
        id
      },
      include: {
        image: true
      }
    }) as any
    if(!user) return null
    const courses = await prisma.course.findMany({
      where: {
        creatorID: id
      },
      include: {
        creator: true,
        image: true,
        lessons: true
      }
    })

    if(!user){
      return null
    }
    
    return (
      <div className="w-full h-full xl:px-16 lg:px-12 md:px-8 px-4 max-w-[1400px] mx-auto mb-8 flex flex-col">
          <MentorClientPage user={user} />
          <h1 className="tracking-wider text-center font-semibold text-3xl max-sm:text-xl mt-12">
              My Courses
          </h1>
          <MentorCourses courses={courses} />
      </div>
    )
}

export default Mentor