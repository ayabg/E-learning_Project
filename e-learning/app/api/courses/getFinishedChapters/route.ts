import { getFinishedChaptersForUser } from "@/app/actions/CourseActions/Chapter"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try{
        const {courseid, userid} = await req.json()
        const response = await getFinishedChaptersForUser(userid, courseid)
        return NextResponse.json({finishedchapters: response}, {status: 200})
    }catch(err: any){
        console.log(err)
        return NextResponse.json({error: err.message}, {status: 500})
    }
}