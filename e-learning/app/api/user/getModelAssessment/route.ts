import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try{
        const {userid} = await req.json()
        const response = await axios.post("http://127.0.0.1:5000/Assessment", {
            user_id: userid
        })
        if(response.status !== 200){
            throw new Error("an error has occured")
        }
        const data = response.data.assessment
        return NextResponse.json({assessment: data}, {status: 200})
    }catch(err){
        return NextResponse.json({message: "an internal error has occured"}, {status: 500})
    }
}