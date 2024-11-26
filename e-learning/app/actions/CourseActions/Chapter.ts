"use server"
import prisma from "@/lib/util/db";
export const markChapterAsFinished = async (
    formdata: FormData
  ): Promise<boolean> => {
    try {
        const userID = formdata.get('userid') as string;
        const chapterID = formdata.get('chapterid') as string;
        const subscribedCourseID = formdata.get('subscribedcourseid') as string;
        console.log('Marking chapter as finished:', userID, chapterID, subscribedCourseID);
        await prisma.completedChapter.create({
            data: {
                userid: userID,
                chapterID: chapterID,
                subscribedCourseID: subscribedCourseID,
                completedAt: new Date(),
            },
        });
      return true; 
    } catch (error) {
      console.error('Error marking chapter as finished:', error);
      return false; 
    }
};

export const getFinishedChaptersForUser = async (
    userID: string,
    courseID: string
    ): Promise<any[]> => {
    try {
        const finishedChapters = await prisma.completedChapter.findMany({
        where: {
            subscribedCourse: {
                userid: userID,
                courseid: courseID,
            },
        },
        select: {
            chapterID: true,
        }
        });
        return finishedChapters;
    } catch (error) {
        console.error('Error fetching finished chapters for user:', error);
        return []
    }
};