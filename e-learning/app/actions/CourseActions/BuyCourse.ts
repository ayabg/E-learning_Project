"use server"
import prisma from "@/lib/util/db"

export async function BuyCourse(formdata: FormData): Promise<{success: boolean, error?: string}> {
    try{
        const courseid = formdata.get("courseid") as string
        const userid = formdata.get("userid") as string
        const course = await prisma.course.findUnique({
            where: {
                id: courseid
            }
        })
        if(!course){
            return {success: false, error: "Course not found"}
        }
        const existingSubscribtion = await prisma.subscribedCourses.findFirst({
            where: {
                courseid: courseid,
                userid: userid
            }
        })
        if(existingSubscribtion){
            return {success: false, error: "You have already subscribed to this course"}
        }
        const subscribed = await prisma.subscribedCourses.create({
            data: {
                courseid: courseid,
                userid: userid
            }
        })
        if(!subscribed){
            return {success: false, error: "Failed to subscribe to course"}
        }
        return {success: true}
    }catch(err: any){
        console.log({err})
        return {success: false, error: "An error occurred"}
    }
}

export async function checkCoursebought(courseid: string, userid: string): Promise<string> {
    try{
        const course = await prisma.subscribedCourses.findFirst({
            where: {
                courseid: courseid,
                userid: userid
            }
        })
        if(!course){
            return ""
        }
        else{
            return course.id
        }
    }catch(err: any){
        console.error(err)
        return ""
    }
}