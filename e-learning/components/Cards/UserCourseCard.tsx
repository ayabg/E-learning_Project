"use client"

import { ChevronRightIcon } from 'lucide-react'
import React from 'react'
import Image from 'next/image'
import SmallStarsComponent from '../Rating/SmallStars'
import { useRouter } from 'next/navigation'
interface CourseCardProps {
    image: any
    title: string
    lessons: number
    users: number
    difficulty: string
  }
function UserCourse({image, title, lessons, users, difficulty}: CourseCardProps) {
    const router = useRouter() 
    return (
    <div className="group flex flex-col items-center shadow-course-card rounded-lg gap-3 md:pb-3">
        <div className="relative overflow-hidden w-full ">
            <Image src={image} alt='' className="object-cover w-full rounded-t-lg" />
            <div className="absolute rounded-t-lg w-full h-full bg-black/40 hidden md:flex items-center justify-center -bottom-10 group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <button onClick={()=>router.push("/courses/course")} className="flex items-center w-fit justify-center text-sm text-white bg-black hover:bg-black/80 transition-all duration-100 py-4 px-4 rounded-md">
                    View Course
                    <ChevronRightIcon className="w-4 h-4 transition duration-200" />
                </button>
            </div>
        </div>
        <div className="w-full flex flex-col gap-3 px-2">
            <div className="gap-1 flex flex-col w-full">
                <h1 className="text-sm self-start text-black font-semibold max-w-full truncate"> {title} </h1>
                <p className="text-xs text-gray-600">
                    Le lorem ipsum est, en imprimerie,
                    une suite de mots sans signification utilisée à titre provisoire...
                </p>
            </div>

            <div className="gap-1 flex flex-col w-full mt-2">
                <h1 className="text-sm self-start text-gray-800 font-semibold max-w-full truncate"> M.Mouhib </h1>
                <div className="flex w-full items-center gap-1">
                    <span className="text-xs font-semibold text-gray-700"> 4.7 </span>
                    <SmallStarsComponent />
                </div>
                
            </div>
            
            <div className="flex justify-between items-center mt-2">
                <span className="text-sm font-semibold text-violet-600">
                    10 Lessons
                </span>
                <span className="text-sm font-semibold text-gray-600">
                    100.45 TND
                </span>
            </div>
        </div>
        <button onClick={()=>router.push("/courses/course")} className="flex md:hidden bg-black text-white w-full py-3 active:bg-black/80 transition-all duration-100 delay-75 justify-center items-center rounded-b-lg"> <span>View Course</span> </button>
    </div>
  )
}

export default UserCourse