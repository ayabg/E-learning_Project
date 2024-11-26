"use server"
import { Input } from '@/components/ui/input'
import prisma from '@/lib/util/db'
import { User, Image } from '@prisma/client'
import { SearchIcon } from 'lucide-react'
import MentorsComponent from '@/components/pages/Mentors'
import SadAnimation from '@/components/Animations/SadAnimation'
async function Mentors() {
    const mentors = await prisma.user.findMany({
        where: {
            role: "mentor"
        },
        include: {
            image: true,
            createdCourses: true
        }
    }) as unknown as User & { image: Image }[]
    return (
        <div className="max-w-[1200px] flex flex-col mx-auto mt-16 xl:px-16 lg:px-12 md:px-8 px-4">
            
            {
                /*
                <div className="relative md:max-w-[300px]">
                    <Input className="" placeholder="ex. John Doe"/>
                    <SearchIcon className="absolute right-2 top-0 translate-y-2 w-5 h-5 hover:text-violet-600 transition-all duration-150 cursor-pointer" />
                </div>
                */
            }
            {
                mentors.length > 0 ?
                    <>
                        <h1 className="self-center text-4xl max-sm:text-xl font-bold leading-relaxed tracking-wide text-center"> Our Best Mentors </h1>
                        <MentorsComponent mentors={mentors} />
                    </>
                :
                    <div>
                        <h1 className="self-center text-4xl max-sm:text-xl font-bold leading-relaxed tracking-wide text-center"> No Mentors Available </h1>
                        <SadAnimation />
                    </div>
            }
        </div>
    )
}

export default Mentors