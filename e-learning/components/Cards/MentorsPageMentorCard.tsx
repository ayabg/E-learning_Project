"use client"
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { BriefcaseBusiness, ChevronRightIcon, GraduationCap, ImageIcon, MailIcon, MapPin } from 'lucide-react'
import { Skeleton } from '../ui/skeleton'
import { subString } from '@/lib/util/String'

interface MentorCardProps {
    image: any,
    email: string,
    name: string,
    jobTitle: string,
    jobLocation: string,
    courses: number,
    bio: string,
    color: string,
    id: string
}

function MentorCard({image, name, email, jobTitle, jobLocation,courses, bio, color, id}: MentorCardProps) {
    const router = useRouter() 
    return (
        <div className="flex relative group flex-col items-center rounded-lg gap-2 md:pb-3 border w-full min-w-72 bg-white overflow-hidden">
            <div className={`absolute rounded-t-lg w-full h-full bg-black/40 hidden md:flex items-center justify-center -bottom-40 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10`}>
                <button onClick={()=>router.push(`/mentors/mentor?id=${id}`)} className="flex items-center w-fit justify-center text-sm text-white bg-black hover:bg-black/80 transition-all duration-100 py-4 px-4 rounded-md ">
                    Visit Mentor
                    <ChevronRightIcon className="w-4 h-4 transition duration-200" />
                </button>
            </div>
            <div className="w-full h-[8rem] rounded-t-lg" style={{backgroundColor: color}} />
            <div className="w-[5rem] absolute h-[5rem] rounded-full shadow-md translate-y-[5.2rem]">
                {
                    image? (
                        <Image src={image} alt={name} width={100} height={100} className="w-full h-full rounded-full" />
                    )
                    :
                    <div className="w-full h-full rounded-full bg-gray-100 flex justify-center items-center">
                        <ImageIcon className="text-gray-500 w-6 h-6" />
                    </div>
                }
            </div>
            <h1 className="capitalize mt-8 text-xl font-medium text-gray-700">
                {name}
            </h1>
            <p className="text-gray-500">
                {subString(jobTitle, 15)}
            </p>
            <div className="flex flex-col items-start w-full px-2">
                <p className="text-gray-600 text-sm flex items-center gap-1 py-1"> <MapPin className="w-4 h-4 -translate-y-[2px]" /> {jobLocation ? jobLocation : "No Location provided"} </p>
                <p className="text-gray-600 text-sm flex items-center gap-1 py-1"> <MailIcon className="w-4 h-4 -translate-y-[2px]" /> {email} </p>
            </div>
            <button onClick={()=>router.push(`/mentors/mentor?id=${id}`)} className="flex md:hidden bg-black text-white w-full py-3 active:bg-black/80 transition-all duration-100 delay-75 justify-center items-center rounded-b-lg"> <span>Visit Mentor</span> </button>
        </div>
    )
}

export default MentorCard

/*
<div className="group flex flex-col items-center rounded-lg gap-3 md:pb-3 border-2 w-full h-full min-w-64">
            <div className="relative overflow-hidden w-full sm:h-[10rem] h-[13rem]">
                { 
                    image? (
                        <>
                            <Image src={image} alt='' width={100} height={100} className="object-cover w-full rounded-t-lg" />
                            <div className="absolute rounded-t-lg w-full h-full bg-black/40 hidden md:flex items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                <button onClick={()=>router.push("/mentors/mentor")} className="flex items-center w-fit justify-center text-sm text-white bg-black hover:bg-black/80 transition-all duration-100 py-4 px-4 rounded-md">
                                    Visit Mentor
                                    <ChevronRightIcon className="w-4 h-4 transition duration-200" />
                                </button>
                            </div>
                        </>
                    )
                    :
                    (
                        <>
                            <Skeleton className="w-full h-full rounded-t-lg " />
                            <div className="absolute rounded-t-lg w-full h-full bg-black/40 hidden md:flex items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                <button onClick={()=>router.push("/mentors/mentor")} className="flex items-center w-fit justify-center text-sm text-white bg-black hover:bg-black/80 transition-all duration-100 py-4 px-4 rounded-md">
                                    Visit Mentor
                                    <ChevronRightIcon className="w-4 h-4 transition duration-200" />
                                </button>
                            </div>
                        </>
                    )
                }
            </div>
            <div className="w-full px-2">
                <h1 className="font-semibold text-lg text-gray-800 break-words"> {name} </h1>
                <p className="text-gray-700 py-2 truncate">
                    {bio} dzdoiezhfoezfedzdoiezhfoezfedzdoiezhfoezfedzdoiezhfoezfedzdoiezhfoezfedzdoiezhfoezfedzdoiezhfoezfedzdoiezhfoezfedzdoiezhfoezfedzdoiezhfoezfedzdoiezhfoezfedzdoiezhfoezfedzdoiezhfoezfedzdoiezhfoezfedzdoiezhfoezfedzdoiezhfoezfedzdoiezhfoezfedzdoiezhfoezfedzdoiezhfoezfedzdoiezhfoezfedzdoiezhfoezfedzdoiezhfoezfedzdoiezhfoezfe
                </p>
                <p className="text-gray-700 text-sm mt-2 flex items-center gap-2"> <BriefcaseBusiness className="w-5 h-5"/> {jobTitle} </p>
                <p className="text-gray-700 text-sm flex items-center gap-2 py-1"> <MapPin className="w-5 h-5" /> {jobLocation} </p>
                <p className="text-gray-700 text-sm flex items-center gap-2 py-1"> <MailIcon className="w-5 h-5" /> {email} </p>
            </div>
            <button onClick={()=>router.push("/mentors/mentor")} className="flex md:hidden bg-black text-white w-full py-3 active:bg-black/80 transition-all duration-100 delay-75 justify-center items-center rounded-b-lg"> <span>Visit Mentor</span> </button>
        </div>
*/