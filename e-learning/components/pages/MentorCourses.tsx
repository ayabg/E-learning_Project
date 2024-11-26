"use client"

import axios from "axios"
import CoursesPageCourseCard from "../Cards/CoursesPageCourseCard"
import { useLayoutEffect, useState } from "react"

function MentorCourses({courses}: {courses: any[]}) {
    const [images, setimages] = useState<{CourseID: string, data: string}[]>([])
    const getCoursesiamges = async() => {
        const response = await axios.post("/api/courses/getcoursesthumbnails", {
            courseIDs: Array.from(courses.map((course: any) => course.id))
        })
        const {ImagesData} = response.data
        setimages(prev => ImagesData)
    }
    useLayoutEffect(()=>{
        getCoursesiamges()
    }, [])
    return (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4 w-full max-w-[1980px]">
            {
                courses.map((course, index) => {
                    const courseImage = images.find((thumbnail) => thumbnail.CourseID === course.id)?.data
                    return(
                        <CoursesPageCourseCard id={course.id} description={course.description} price={course.price} mentor={course.creator.name} image={courseImage} title={course.title} lessons={course.lessons.length} difficulty={course.difficulty} users={course.users} />
                    )
                })   
            }
        </div>
    )
}

export default MentorCourses