"use client"
import axios from 'axios'
import React, { useLayoutEffect, useState } from 'react'
import Image from 'next/image'
import { ImageIcon, MapPinIcon } from 'lucide-react'
import { User, Image as imagetype } from '@prisma/client'

function MentorClientPage({user}: {user: User & {image: imagetype}}) {
    const [userimage, setuserimage] = useState<string>()
    const getUserimage = async () => {
        if(user.image.location === "local"){
            const response = await axios.post("/api/user/getUserImage", {
                email: user?.email,
                provider: user?.provider
            })
            setuserimage(response.data.image)
        }
        setuserimage(user.image.path)
      }
      useLayoutEffect(()=> {
        getUserimage()
      }, [])
    return (
        <div className="flex items-center max-sm:flex-col mt-12 gap-3">
            <div className="md:w-36 md:h-36 w-24 h-24">
                {
                    userimage ?
                        <Image src={userimage} alt='' width={100} height={100} className="object-cover w-full h-full rounded-full border-purple-500 border-2" />
                    :   
                    <div className="w-full h-full rounded-full bg-gray-100 flex justify-center items-center">
                        <ImageIcon className="text-gray-500 w-6 h-6 animate-pulse" />
                    </div>
                }
            </div>
            <div className="flex flex-col">
                <p className="truncate font-semibold md:text-xl text-purple-900"> {user?.name} </p>
                <p className="truncate font-medium text-gray-500 max-md:text-sm"> {user?.email} </p>
                <p className="md:text-sm text-xs text-gray-400 ml-1 mt-4"> {user?.job} </p>
                <p className="md:text-sm text-xs text-gray-400 flex items-center gap-1"> <MapPinIcon className="md:w-5 md:h-5 w-4 h-4" /> {user?.location ? user?.location : "No location provided"} </p>
            </div>
        </div>
    )
}

export default MentorClientPage