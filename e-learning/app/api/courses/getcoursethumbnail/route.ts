import { NextResponse } from "next/server";
import prisma from "@/lib/util/db";
import { getImageByPath } from "@/lib/util/Images";

export async function POST(req: Request) {
    try{
        const {courseID} = await req.json();
        
        const course = await prisma.course.findUnique({
            where: {id: courseID},
            include: {image: true}
        });

        
        if(!course?.image){
            return NextResponse.json({ error: "No image available for the given course" }, { status: 400 });
        }
        const imagePath = `${course.image.path}`;
        const base64Image = await getImageByPath(imagePath);
        if(base64Image){
            return NextResponse.json({ ImageData: base64Image }, { status: 200 });
        }
        
        return NextResponse.json({ error: "No image available for the given course" }, { status: 400 });

    }catch(err: any){
        console.log(err);
        return NextResponse.json({ message: err?.message }, { status: 500 });
    }
}