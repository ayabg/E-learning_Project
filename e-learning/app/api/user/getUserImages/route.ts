import prisma from "@/lib/util/db";
import { getImageByPath } from "@/lib/util/Images";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try{
        const {userids} = await req.json()
        const users = await prisma.user.findMany({
            where: {
                id: {
                    in: userids
                }
            },
            include: {
                image: true
            }
        }) 

        const Images: Array<{userid: string, data: string}> = []
        for(const user of users){
            if(!user.image){
                continue
            }
            const imagelocation = user.image.location
            if(imagelocation === "local"){
                const imagepath = user.image.path
                const base64Image = await getImageByPath(imagepath)
                if(base64Image){
                    Images.push({
                        userid: user.id,
                        data: base64Image
                    })
                }
            }else{
                Images.push({
                    userid: user.id,
                    data: user.image.path
                })
            }
        }

        return NextResponse.json({images: Images}, {status: 200})

    }catch(err){
        console.log(err)
        return NextResponse.json({message: "an internal error has occured"}, {status: 500})
    }
}