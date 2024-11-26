import { AnswerQuiz } from "@/app/actions/CourseActions/Quiz"
import axios from "axios"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try{
        const {quizid, responses, userid} = await req.json()
        const response = await axios.post("http://127.0.0.1:5000/Evaluation", {
            quizid, responses, userid
        })
        if(!response.data){
            throw new Error("Error while evaluating quiz")
        }
        console.log(response.data)
        let modelResponse = response.data.evaluation as string
        modelResponse = modelResponse.replace(/'/g, '"');
        let parsedData = JSON.parse(modelResponse);
        const quizanswered = await AnswerQuiz(userid, quizid, parsedData)
        if(!quizanswered){
            throw new Error("Error while saving quiz answers")
        }
        return NextResponse.json({success: true})
    }catch(err: any){
        console.log(err)
        return NextResponse.json({message: err.message}, {status: 500})
    }
}