"use server"
import prisma from "@/lib/util/db";
import { deleteImageByPath, saveBase64Image } from "@/lib/util/Images";
import { Lesson } from "@/types/types";

export async function UpdateCourse(formdata: FormData): Promise<{success: boolean, error?: string}> {
    try{
        const title = formdata.get('title') as string;
        const price = formdata.get('price') as string;
        const description = formdata.get('description') as string;
        const language = formdata.get('language') as string;
        const difficulty = formdata.get('difficulty') as string;
        const category = formdata.get('category') as string;
        const image = JSON.parse(formdata.get('image') as string);
        const courseId = formdata.get('courseId') as string;
        const course = await prisma.course.findUnique({where: {id: courseId}, select: {image: true}})
        
        const deletedImage = deleteImageByPath(course?.image?.path as string)
        if(!deletedImage) throw new Error("Failed to delete image")
        
        const courseimagepath = await saveBase64Image(image as string, title)
        const updatedCourse = await prisma.course.update({
            where: {
                id: courseId
            },
            data: {
                title,
                price: parseFloat(price),
                description,
                language,
                difficulty,
                category,
                image: {
                    update: {
                        where: {
                            id: course?.image?.id
                        },
                        data: {
                            path: courseimagepath,
                            location: "local"
                        }
                    }
                }
            }
        })
        if(!updatedCourse) throw new Error("Failed to update course")
        return {success: true}
    }catch(err: any){
        console.log(err)
        return {success: false, error: err.message}
    }
}


export async function addLessons(formdata: FormData): Promise<{success: boolean, error?: string}> {
    try{
        const courseId = formdata.get('courseid') as string
        const lessons = JSON.parse(formdata.get('lessons') as string) as Lesson[]
        const courseExists = await prisma.course.findUnique({
            where: { id: courseId },
          });
          
          if (!courseExists) {
            throw new Error("Course with the specified ID does not exist.");
          }
        const updatedCourse = await prisma.course.update({
            where: {
                id: courseId
            },
            data: {
                lessons: {
                    create: lessons.map((lesson) => ({
                        title : lesson.title,
                        chapters: {
                            create: lesson.chapters.map(chapter => ({
                                title: chapter.title,
                                videoUrl: chapter.videoUrl,
                                duration: parseInt(chapter.duration.toString()),
                                score: parseFloat(chapter.score.toString())
                            }))
                        },
                        quiz: {
                            create: {
                                title: lesson.quiz.title,
                                questions: {
                                    create: lesson.quiz.questions.map(question => ({
                                        content: question.content,
                                        answer: question.answer,
                                        max_score: parseFloat(question.max_score.toString())
                                    }))
                                }
                            }
                        }
                    }))
                }
            }
        })
        
        if(!updatedCourse) throw new Error("Failed to create lesson")
        return {success: true}
    }catch(err: any){
        console.log(err.message)
        return {success: false, error: err.message}
    }
}