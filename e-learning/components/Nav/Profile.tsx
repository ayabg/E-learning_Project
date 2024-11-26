"use client"
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useLayoutEffect, useState } from 'react'

function Profile() {
    const session = useSession()
    const user = session.data?.user as {email: string, image: string, name: string, role: string, provider: string}
    const [image, setImage] = useState<string>()
    const fetchUserImage = async() => {
        if(user.image.startsWith("http")){
            setImage(user.image)
        }else{
            const response = await axios.post("/api/user/getUserImage", {email: user?.email, provider: user?.provider})
            const {image} = response.data
            setImage(image)
        }
    }
    useLayoutEffect(() => {
        fetchUserImage()
    }, [])
    return (
        <a className="w-10 h-10 cursor-pointer" href={`${user?.role === "mentor" ? "/mentor-profile" : "/user-profile"}`} >
            {
                image ? (
                    <Image src={`${image}`} alt={`${user?.name}`} width={100} height={100} className="object-cover w-full h-full rounded-full" />
                )
                :
                (
                    <div className="w-full h-full bg-gray-200 rounded-full flex justify-center items-center">
                        <p className="text-gray-500 text-lg font-bold">{user?.name[0]}</p>
                    </div>
                )
            }
        </a>
    )
}

export default Profile