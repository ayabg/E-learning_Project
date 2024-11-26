import React from 'react'
import Image from 'next/image'
import { BookMarkedIcon, ChevronRightIcon, ChartColumnIncreasingIcon , LibraryBig, User2Icon, ZapIcon } from 'lucide-react'
import StarsComponent from '../Rating/StarsComponent'
interface CourseCardProps {
    image: any
    title: string
    lessons: number
    users: number
    difficulty: string
  }
function CourseCard({image, title, lessons, users, difficulty}: CourseCardProps){
  return (
    <div className="w-[16rem] max-md:w-full p-3 flex flex-col items-center shadow-course-card rounded-lg gap-3">
        <Image src={image} alt='' className="object-cover w-full rounded-lg" />
        <div className="flex w-full justify-between">
            <StarsComponent />
            <span className="text-sm font-semibold text-teal-500"> 100TND </span>
        </div>
        <h1 className="text-xs self-start text-black font-bold max-w-full truncate"> {title} </h1>
        <div className="w-full flex justify-between">
            <div className="flex gap-[2px] items-center">
                <LibraryBig className="text-violet-400 w-4 h-4" />
                <span className="text-xxs text-neutral-600 font-semibold"> {lessons} Lesson </span>
            </div>
            <div className="flex gap-[2px] items-center">
                <ChartColumnIncreasingIcon className="text-red-400 w-4 h-4" />
                <span className="text-xxs text-neutral-600 font-semibold"> {difficulty} </span>
            </div>
            <div className="flex gap-[2px] items-center">
                <User2Icon className="text-orange-400 fill-orange-400 w-4 h-4" />
                <span className="text-xxs text-neutral-600 font-semibold"> {users} </span>
            </div>
        </div>
        <button className="flex items-center justify-center text-xs text-white bg-violet-500 hover:bg-violet-500/95 group py-2 px-2 font-semibold rounded-md w-full mt-1"> Start Course <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition duration-200" /> </button>
    </div>
  )
}

export default CourseCard