import { checkCoursebought } from "@/app/actions/CourseActions/BuyCourse";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try{
        const {courseid, userid} = await req.json()
        const response = await checkCoursebought(courseid, userid)
        if(response.length > 0){
            return NextResponse.json({bougth: true, subscribedCourse: response}, {status: 200})
        }
        else{
            return NextResponse.json({bougth: false}, {status: 200})
        }
    }catch(err: any){
        console.log(err)
        return NextResponse.json({error: err.message}, {status: 500})
    }
}