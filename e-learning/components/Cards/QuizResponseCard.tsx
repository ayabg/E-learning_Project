"use client"
import React from 'react'
import { BotIcon, ThumbsDown, ThumbsUp, User2Icon } from 'lucide-react'
import { ExtendedAnsweredQuiz } from '../Accordions/CourseAccordion'
import { AnsweredQuestion, answeredQuiz, Question, Quiz } from '@prisma/client'
import axios from 'axios'
import { toast } from 'sonner'

type extedndedAnsweredQuizWithQuiz = ExtendedAnsweredQuiz & {
    quiz: Quiz
}

type ExtendedType = answeredQuiz & {
    answeredQuestions: AnsweredQuestion & { question: Question }[],
    quiz: Quiz
}

function QuizResponseCard({submission}: {submission: extedndedAnsweredQuizWithQuiz}) {
    const evaluateQuiz = async(Eval: number) => {
        try{
            const response = await axios.post("/api/courses/EvaluateQuizModel", {
                quiz_id: submission.quiz.id,
                evaluation: Eval
            })
            console.log(response.data)
            if(response?.data?.success === true){
                toast("Quiz Evaluated", {
                    description: "The quiz model has been evaluated successfully",
                    action: {
                        label: "Close",
                        onClick: () => {}
                    }  
                })
            }else{
                toast("Failed to submit quiz", {
                    description: "couldn't evaluate the quiz model",
                    action: {
                        label: "Retry",
                        onClick: () => {}
                    }
                })
            }
        }catch(err){
            toast("Failed to evaluate quiz", {
                description: "An internal error has occured please try again",
                action: {
                    label: "Retry",
                    onClick: () => {}
                }  
            })
        }
    }
    return (
        <div className="rounded-3xl bg-gray-50 border w-full p-4 items-center shadow-sm flex flex-col justify-between">
            <div className="flex flex-col items-center w-full">
                <h1 className="text-lg font-bold font-sans text-center">
                    {
                        submission.quiz.title
                    }
                </h1>
                {
                    submission.answeredQuestions.map((question, index) => (
                        <div className="pl-2 flex flex-col gap-2 text-sm items-start w-full">
                            <p className="text-gray-700 font-sans flex items-center gap-1">
                                <span className="w-1 h-1 rounded-full bg-black" />
                                {
                                    question.question.content
                                }
                            </p>
                            <div className="w-full flex justify-between items-center">
                                <span className="text-[#637887] flex items-center gap-1">
                                    <User2Icon className="w-4 h-4 -translate-y-px" />
                                    {
                                        question.answer
                                    }
                                </span>
                                <span className="text-indigo-600 font-semibold whitespace-nowrap self-end">
                                    {
                                        question.model_score
                                    } / 15
                                </span>
                            </div>
                        </div>
                    )
                    )
                }
            </div>
            <div className="border-t flex justify-end gap-2 items-center text-gray-500 pt-4 w-full">
                <ThumbsUp onClick={()=>evaluateQuiz(1)} className="w-5 h-5 active:-translate-y-1 transition-all duration-500 cursor-pointer hover:text-gray-600" />
                <ThumbsDown onClick={()=>evaluateQuiz(-1)} className="w-5 h-5 active:translate-y-1 transition-all duration-500 cursor-pointer hover:text-gray-600"/>
            </div>
        </div>
    )
}

export default QuizResponseCard