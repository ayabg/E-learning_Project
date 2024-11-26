"use server"

import CourseDetails from '@/components/Courses/CourseDetails'
import AuthOptions from '@/lib/util/AuthOptions'
import prisma from '@/lib/util/db'
import { getParams } from '@/lib/util/params'
import { User } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { headers } from 'next/headers' 

async function CoursePage() {
    const session = await getServerSession(AuthOptions)
    if(!session) return null
    const headerlist = headers()
    const pathname = headerlist.get("x-current-path")
    const params: URLSearchParams = getParams(pathname)
    const id = params.get("id") as string
    const {user} = session
    
    const course = await prisma.course.findUnique({where: {id: id}, include: {creator: {include: {image: true}},lessons: {include: {quiz: {include: {questions: true}}, chapters: true}}}}) as any
    const userdetails = await prisma.user.findUnique({where: {email_provider: {email: user?.email as string, provider: user?.provider as string}}, include: {image: true}}) as User
    if(!course){
        return null
    }

    return (
        <div className="w-full h-full md:px-8 sm:px-4 px-2 max-w-[1400px] mx-auto mb-8">
            <h1 className="md:text-base text-sm mt-4"> <a href="/courses" className="no-underline"> Courses </a> &gt; <span className="text-purple-500"> {course.title} </span> </h1>
            <CourseDetails course={course} user={userdetails as User} />
        </div>
    )
}

export default CoursePage