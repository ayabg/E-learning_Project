import AuthOptions from "@/lib/util/AuthOptions"
import prisma from "@/lib/util/db"
import axios from "axios"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function POST(req: Request){
    try{
        const {evaluation} = await req.json()
        const session = await getServerSession(AuthOptions)
        const user_id = await prisma.user.findUnique({where: {email_provider: {email: session?.user?.email as string, provider: session?.user?.provider as string}}})
        const response = await axios.post("http://127.0.0.1:5000/Assessmentfeedback", {
            user_id: user_id,
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