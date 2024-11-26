import axios from "axios"
import { NextResponse } from "next/server"

export async function POST(req: Request){
    try{
        const {quiz_id, evaluation} = await req.json()
        const response = await axios.post("http://127.0.0.1:5000/Evaluationfeedback", {
            quiz_id: quiz_id,
            feedback: evaluation
        })
        if(!response.data){
            throw new Error("Error while evaluating quiz")
        }
        return NextResponse.json({success: true}, {status: 200})
    }catch(err: any){
        console.log(err)
        return NextResponse.json({message: err.message}, {status: 500})
    }
}