"use client"
import React, { useLayoutEffect, useState } from 'react'
import MentorCard from '@/components/Cards/MentorsPageMentorCard'
import axios from 'axios'
import { generateRandomColor } from '@/lib/util/String'


function MentorsComponent({mentors}: {mentors: Array<any>}) {
  const [userimages, setuserimages] = useState<{userid: string, data: string}[]>([])
  const getImages = async() => {
    const response = await axios.post("/api/user/getUserImages", {
      userids: Array.from(mentors.map((mentor: any) => mentor.id))
    })
    const {images} = response.data
    setuserimages(images)
  }
  useLayoutEffect(()=>{
    getImages()
  }, [])
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-4 w-full max-w-[1980px] xl:px-16 lg:px-12 md:px-8 px-4">
        {
            mentors.map((mentor: any, index: number) => {
                const color = generateRandomColor()
                const userimage = userimages.find((image) => image.userid === mentor.id)
                return(
                    <MentorCard id={mentor.id} color={color} bio={mentor.bio} key={index} image={userimage?.data} name={mentor.name} email={mentor.email} jobTitle={mentor.job} jobLocation={mentor.location} courses={mentor?.createdCourses?.length || 0} />
                )
            })   
        }
    </div>
  )
}

export default MentorsComponent