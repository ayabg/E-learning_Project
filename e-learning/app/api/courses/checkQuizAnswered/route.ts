import { getFinishedQuizes } from "@/app/actions/CourseActions/Quiz";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try{
        const {quizids, userid} = await req.json()
        console.log(quizids)
        const response = await getFinishedQuizes(userid, quizids)
        console.log(response)
        return NextResponse.json({answeredQuizes: response}, {status: 200})
    }catch(err: any){
        return NextResponse.json({message: err.message}, {status: 500})
    }
}