"use client"
import { Course, Lesson } from '@prisma/client'
import axios from 'axios';
import MentorCourseCard from '@/components/Cards/MentorCourseCard'
import { useLayoutEffect, useState } from 'react';

export type ExtendedCourseWithLessons = Course & { lessons: Lesson[] };

function CoursesPageMentor({courses}: {courses: ExtendedCourseWithLessons[]}) {
    const [thumbnails, setThumbnails] = useState<Array<{CourseID: string; data: string}>>([])
    const getThumbnails = async() => {
        const response = await axios.post("/api/courses/getcoursesthumbnails", {
            courseIDs: Array.from(courses.map((course) => course.id))
        })
        const {ImagesData} = response.data
        setThumbnails(prev => ImagesData)
    }

    useLayoutEffect(()=>{
        getThumbnails()
    }, [])

    return (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4 w-full max-w-[1980px] xl:px-16 lg:px-12 md:px-8 px-4">
            {
                courses.map((course, index) => {
                    const courseImage = thumbnails.find((thumbnail) => thumbnail.CourseID === course.id)?.data
                    return(
                        <MentorCourseCard id={course.id} image={courseImage} description={course.description} price={course.price} title={course.title} lessons={course.lessons.length} difficulty={course.difficulty} users={100} />
                    )
                })   
            }
        </div>
    )
}

export default CoursesPageMentor