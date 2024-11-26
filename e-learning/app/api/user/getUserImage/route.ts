import { NextResponse } from "next/server";
import prisma from "@/lib/util/db";
import { getImageByPath } from "@/lib/util/Images";

export async function POST(req: Request) {
    try{
        const {email, provider} = await req.json();
        
        const user = await prisma.user.findUnique({
            where: {
                email_provider: {
                    email,
                    provider
                }
            },
            select: {
                image: true
            }
        })

        
        if(!user){
            return NextResponse.json({ error: "No image available for the given course" }, { status: 400 });
        }
        const imagePath = `${user?.image?.path}`;
        const base64Image = await getImageByPath(imagePath);
        if(base64Image){
            return NextResponse.json({ image: base64Image }, { status: 200 });
        }
        
        return NextResponse.json({ error: "No image available for the given course" }, { status: 400 });

    }catch(err: any){
        console.log(err);
        return NextResponse.json({ message: err?.message }, { status: 500 });
    }
}