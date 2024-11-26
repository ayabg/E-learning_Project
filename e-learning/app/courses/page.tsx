import CourseRecommendationModal from '@/components/Modals/CourseRecommendationModal'
import Coursespage from '@/components/Courses/Coursespage'
import prisma from '@/lib/util/db'
import { getServerSession } from 'next-auth'
import AuthOptions from '@/lib/util/AuthOptions'
import { User } from '@prisma/client'
import CourseProvider from '../context/CourseContext'

async function CoursesPage() {
  const session = await getServerSession(AuthOptions)
  console.log(session)
  let user
  if(session?.user) user = await prisma.user.findUnique({where: {email_provider: {email: session?.user?.email as string, provider: session?.user?.provider as string}}}) as User
  console.log(user)
  const courses = await prisma.course.findMany({include: {lessons: true, creator: true}})
  return (
    <CourseProvider>
      {
        user &&
        (user?.preferredLanguages?.length === 0 && user?.preferredCategories?.length === 0) && <CourseRecommendationModal />
      }
      <Coursespage courses={courses} userid={user?.id} />
    </CourseProvider>
  )
}

export default CoursesPage