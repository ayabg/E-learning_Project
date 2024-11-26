import prisma from "@/lib/util/db";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try{
        const {userid} = await req.json()
        const response = await axios.post("http://127.0.0.1:5000/recommendation", {
            user_id: userid
        })
        if(response.status !== 200){
            throw new Error("an error has occured")
        }
        const data = response.data
        const courses = await prisma.course.findMany({
            where: {
                id: {
                    in: data
                }
            },
            include: {
                lessons: true,
                creator: true
            }
        })
        return NextResponse.json({courses: courses}, {status: 200})
    }catch(err){
        console.log(err)
        return NextResponse.json({message: "an internal error has occured"})
    }
}