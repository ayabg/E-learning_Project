import NoddingAnimation from '@/components/Animations/NoddingAnimation'
import CoursesPageCourseCard from '@/components/Cards/CoursesPageCourseCard'
import UserCourse from '@/components/Cards/UserCourseCard'
import UserDashCourses from '@/components/pages/UserDashCourses'
import UserProfileSidebar from '@/components/sidebars/UserProfileSidebar'
import AuthOptions from '@/lib/util/AuthOptions'
import prisma from '@/lib/util/db'
import { Course, Lesson, User } from '@prisma/client'
import axios from 'axios'
import { getServerSession } from 'next-auth'

async function UserCourses() {
  const session = await getServerSession(AuthOptions)
  const user = await prisma.user.findUnique({where: {email_provider: {email: session?.user?.email as string, provider: session?.user?.provider as string}}}) as User
  const courses = await prisma.course.findMany({
    where: {
      subscribers: {
        some: {
          userid: user.id
        }
      }
    },
    include: {
      lessons: true,
      creator: true
    }
  }) as any


  return (
    <div className="w-full mb-6 flex">
        <UserProfileSidebar />
        <div className="w-full h-full max-md:p-2 p-12 bg-[#C0C0C0]/15">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 max-md:text-lg md:pl-8">
            My Subscribed Courses
          </h1>
          <div className="w-full max-w-[1500px] mx-auto mt-4 flex flex-col gap-5">
                {
                    courses.length === 0 ? (
                        <div className="w-full flex flex-col gap-3 justify-center items-center">
                            <NoddingAnimation />
                            <p className="mx-8 text-center">
                                You have not subscribed to any course yet <br /> <span className="font-semibold text-red-600">Please Subscribe to a course to see it here</span>
                            </p>
                        </div>
                    )   
                    :
                    <UserDashCourses courses={courses} />
                }
            
          </div>
        </div>
    </div>
  )
}

export default UserCourses