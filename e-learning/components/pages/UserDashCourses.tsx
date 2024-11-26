"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CoursesPageCourseCard from '../Cards/CoursesPageCourseCard';


function UserDashCourses({courses}: {courses: any}) {
    const [thumbnails, setThumbnails] = useState<Array<{CourseID: string; data: string}>>([])
    const getThumbnails = async() => {
        const response = await axios.post("/api/courses/getcoursesthumbnails", {
            courseIDs: Array.from(courses.map((course: any) => course.id))
        })
        const {ImagesData} = response.data
        setThumbnails(prev => ImagesData)
    }
  
    useEffect(()=>{
        getThumbnails()
    }, [courses])
    return (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4 w-full max-w-[1980px] xl:px-16 lg:px-12 md:px-8 px-4">
            {
                courses.map((course: any, index: number) => {
                    const courseImage = thumbnails.find((thumbnail) => thumbnail.CourseID === course.id)?.data
                    return(
                    <CoursesPageCourseCard mentor={course.creator.name as string} id={course.id} key={index} image={courseImage} price={course.price} title={course.title} lessons={course.lessons.length} difficulty={course.difficulty} description={course.description} users={course.users} />
                    )
                })
            }
        </div>
    )
}

export default UserDashCourses