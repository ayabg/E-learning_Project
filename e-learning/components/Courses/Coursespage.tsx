"use client"
import CourseCard from '@/components/Cards/CourseCard'
import ProductsFiltersSideBar from '@/components/sidebars/CoursesFilterSidebar'
import SmallLoader3Points from '@/components/loaders/SmallLoader3Points'
import React, { useContext, useEffect, useState } from 'react'

import CoursesPageCourseCard from '@/components/Cards/CoursesPageCourseCard'
import { CourseContext } from '@/app/context/CourseContext'
import axios from 'axios'
import { toast } from 'sonner'
import SearchAnimation from '../Animations/SearchAnimation'

function Coursespage({courses, userid}: {courses: any, userid: string | undefined}) {
    const { courseCategory, courseLanguages, courseLevel, courseDuration, selectedPriceRange, modelrecommendationsSelected } = useContext(CourseContext)
    
    const [selectedCourses, setSelectedCourses] = useState<any>(courses)
    const [loading, setLoading] = useState(false)
    const getCoursesbyFilter = async() => {
        setLoading(true)
        try {
            let response
            if(modelrecommendationsSelected){
              response = await axios.post("/api/courses/getModelRecommendations", {
                userid: userid
              })
              console.log(response.data)
            }else{
              response = await axios.post("/api/courses/getCourseByFilter", {
                courseCategory,
                courseLanguages,
                courseLevel,
                courseDuration,
                selectedPriceRange
              });
            }
        
            if (response.status !== 200) {
              toast("Sorry", {
                description: "An internal error has occurred",
                action: {
                  label: "Retry",
                  onClick: () => {},
                },
              });
            } else {
              const data = response.data as any
              setSelectedCourses(data.courses)
            }
            setLoading(false)
          } catch (error) {
            console.error(error)
            setLoading(false)
            toast("Sorry", {
              description: "An error occurred while fetching courses.",
              action: {
                label: "Retry",
                onClick: () => {},
              },
            });
          }
    }

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
    }, [selectedCourses])

  return (
    <div className="w-full h-full flex mb-16">
      <ProductsFiltersSideBar loading={loading} getCoursesbyFilter={getCoursesbyFilter} className='w-80 md:flex flex-col hidden min-h-screen border-r dark:border-r-gray-400 border-r-infinity-border px-4' inputClassName='' setExpanded={() => {}} />
      <div className="w-full h-full md:px-8 sm:px-4 px-2 max-w-[1980px] pt-[2rem]">
        <div className="justify-between items-center gap-2 md:flex hidden">
            {
                true ? (
                    <p className="font-medium">
                        <span>
                            Courses :
                        </span>
                        <span> {selectedCourses && selectedCourses.length} </span>
                    </p>
                )
                :
                <SmallLoader3Points />
            }
            {
              /*
              <div className="flex gap-2 items-center">
                <span className="font-medium">
                    Trier Par:
                </span>
                <DropdownMenu>
                    <DropdownMenuTrigger className="outline-none px-4 py-2 rounded-md border-2 focus:border-infinity-purple shadow-md font-medium text-sm dark:text-gray-400 dark:hover:border-infinity-dark_purple text-infinity-text_secondary_2"> --Choisir un filtre </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem className="cursor-pointer px-6" onSelect={()=>{}} >Date de Création</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer px-6" onSelect={()=>{}} >Nombre de Commandes</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer px-6" onSelect={()=>{}} >Prix</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
              */
            }
        </div>
        <div className="justify-between items-center gap-2 md:hidden flex">
            <button onClick={()=>{}} className="outline-none px-4 py-2 rounded-md border-2 focus:border-infinity-purple shadow-md font-medium text-sm dark:text-gray-400 dark:hover:border-infinity-dark_purple text-infinity-text_secondary_2"> Filtres </button>
            {
              /*
              <div className="flex gap-2 items-center">
                <span className="font-medium">
                    Trier Par:
                </span>
                <DropdownMenu>
                    <DropdownMenuTrigger className="outline-none px-4 py-2 rounded-md border-2 focus:border-infinity-purple shadow-md font-medium text-sm dark:text-gray-400 dark:hover:border-infinity-dark_purple text-infinity-text_secondary_2"> --Choisir un filtre </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem className="cursor-pointer px-6" onSelect={()=>{}} >Date de Création</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer px-6" onSelect={()=>{}} >Nombre de Commandes</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer px-6" onSelect={()=>{}} >Prix</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
              */
            }
        </div>
        {
          !selectedCourses || selectedCourses.length === 0  ?
            <div className="w-full flex flex-col gap-3 justify-center items-center">
              <SearchAnimation />
              <p className="mx-8 text-center">
                The provided filters don't match with any available courses in our platform <br /> <span className="font-semibold text-red-600">Please Try Again with other filters</span>
              </p>
            </div>
          :
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4 w-full max-w-[1980px] xl:px-16 lg:px-12 md:px-8 px-4">
              {
                  selectedCourses.map((course: any, index: number) => {
                      const courseImage = thumbnails.find((thumbnail) => thumbnail.CourseID === course.id)?.data
                      return(
                          <CoursesPageCourseCard mentor={course.creator.name} id={course.id} key={index} image={courseImage} price={course.price} title={course.title} lessons={course.lessons.length} difficulty={course.difficulty} description={course.description} users={course.users} />
                      )
                  })   
              }
          </div>
        }
      </div>
    </div>
  )
}

export default Coursespage