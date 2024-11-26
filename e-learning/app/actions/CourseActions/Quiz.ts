"use server"

import prisma from "@/lib/util/db"

export async function AnswerQuiz (userid: string, quizid: string, responses: any): Promise<boolean> {
    console.log(responses)
    try{
        const answeredQuiz = await prisma.answeredQuiz.create({
            data: {
                userID: userid,
                quizID: quizid,
                answeredQuestions: {
                    create: responses.map((response: any) => {
                        return {
                            answer: response.answer,
                            questionID: response.questionID,
                            userID: userid,
                            quizID: quizid,
                            model_score: response.modelEval
                        };
                    })
                }
            },
        });

        if(!answeredQuiz) return false
        return true        
    }catch(err: any){
        console.log(err)
        console.log(err)
        return false
    }
}

export async function getFinishedQuizes(
    userid: string, 
    quizids: string[],
){
    try{
        const finishedQuizes = await prisma.answeredQuiz.findMany({
            where: {
                userID: userid,
                quizID: {
                    in: quizids
                }
            },
            include: {
                answeredQuestions: true
            }
        })
        return finishedQuizes
    }catch(err){
        console.log(err)
        return []
    }
}