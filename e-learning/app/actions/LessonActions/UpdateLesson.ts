"use server"
import prisma from "@/lib/util/db";
import { Lesson } from "@prisma/client";

export async function UpdateLesson(formdata: FormData): Promise<{success: boolean, error?: string}> {
    try{
        const lessonid = formdata.get("lessonid") as string
        const lessontitle = formdata.get("lessontitle") as string
        const chaptersArray = formdata.getAll("chapters") as string[]
        const chaptersParsed = chaptersArray.map(chapter => JSON.parse(chapter))
        const quiztitle = formdata.get("quizTitle") as string
        const quizQuestionsArray = formdata.getAll("questions") as string[]
        const quizQuestionsParsed = quizQuestionsArray.map(question => JSON.parse(question))
        const updatedLesson = await prisma.lesson.update({
            where: {
                id: lessonid,
            },
            data: {
                title: lessontitle,
                chapters: {
                    updateMany: chaptersParsed.map(chapter => ({
                        where: {
                            id: chapter.id
                        },
                        data: {
                            title: chapter.title,
                            videoUrl: chapter.videoUrl,
                            duration: parseInt(chapter.duration as string),
                            score: parseFloat(chapter.score as string)
                        }
                    }))
                },
                quiz: {
                    update: {
                        title: quiztitle,
                        questions: {
                            updateMany: quizQuestionsParsed.map(question => ({
                                where: {
                                    id: question.id
                                },
                                data: {
                                    content: question.content,
                                    answer: question.answer,
                                    max_score: parseFloat(question.max_score as string)
                                }
                            }))
                        }
                    }
                }
            }
        })
        if(!updatedLesson){
            return {success: false, error: "Lesson not updated"}
        }
        return {success: true}
    }catch(err: any){
        console.log(err)
        return {success: false, error: err.message}
    }
}

export async function DeleteChapter (chapterid: string, lessonid: string): Promise<{success: boolean, error?: string}> {
    try{
        const updatedLesson = await prisma.lesson.update({
            where: {
                id: lessonid
            },
            data: {
                chapters: {
                    delete: {
                        id: chapterid
                    }
                }
            }
        }) 
        if(!updatedLesson){
            return {success: false, error: "Chapter not deleted"}
        }
        return {success: true}
    }catch(err: any){
        console.log(err)
        return {success: false, error: err.message}
    }
}