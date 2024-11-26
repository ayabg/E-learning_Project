import { NextResponse } from "next/server";
import prisma from "@/lib/util/db";
import { getImageByPath } from "@/lib/util/Images";

export async function POST(req: Request) {
    try{
        const {courseIDs} = await req.json();
        
        const courses = await prisma.course.findMany({
            where: {id: {in: courseIDs}},
            include: {image: true}
        });

        
        const Images: Array<{CourseID: string; data: string}> = [];
        for (const course of courses){
            if(!course.image){
                continue;
            }
            const imagePath = `${course.image.path}`;
            const base64Image = await getImageByPath(imagePath);
            if(base64Image){
                Images.push({
                    CourseID: course.id,
                    data: base64Image
                });
            }
        }

        return NextResponse.json({ ImagesData: Images }, { status: 200 });

    }catch(err: any){
        console.log(err);
        return NextResponse.json({ message: err?.message }, { status: 500 });
    }
}