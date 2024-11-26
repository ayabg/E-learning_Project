import React from 'react'
import Image from 'next/image'

interface Mentor {
    name: string
    job: string
    image: any
}

function MentorCard({name, image, job}: Mentor) {
  return (
    <div className="w-[16rem] max-md:w-full relative h-[18rem]">
        <Image src={image} alt='' className="object-cover w-full h-full rounded-lg"/>
        <div className="flex flex-col gap-1 text-white -translate-y-16 pl-4">
            <span className="text-shadow-sm text-lg font-bold"> {name} </span>
            <span className="text-shadow-sm text-sm"> {job} </span>
        </div>
    </div>
  )
}

export default MentorCard