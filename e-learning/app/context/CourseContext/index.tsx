"use client"
import React, { createContext, Dispatch, SetStateAction, useState } from "react";

type CourseContextType = {
    courseLanguages: string[],
    courseCategory: string[],
    courseLevel: string[],
    courseDuration: string[],
    handleLanguageCheckboxChange: any,
    handleCategoryCheckboxChange: any,
    handleLevelCheckboxChange: any,
    handleDurationCheckboxChange: any,
    selectedPriceRange: Array<number>,
    setSelectedPriceRange: any,
    modelrecommendationsSelected: boolean
    setmodelrecommendationsselected: any
}

const initialState: CourseContextType = {
    courseLanguages: [],
    courseCategory: [],
    courseLevel: [],
    courseDuration: [],
    handleLanguageCheckboxChange: () => {},
    handleCategoryCheckboxChange: () => {},
    handleLevelCheckboxChange: () => {},
    handleDurationCheckboxChange: () => {},
    selectedPriceRange: [0, 500],
    setSelectedPriceRange: () => {},
    modelrecommendationsSelected: false,
    setmodelrecommendationsselected: () => {}
}


const CourseContext = createContext<CourseContextType>(initialState)

export default function CourseProvider({children}: {children: React.ReactNode}){

    const [courseLanguages, setCourseLanguages] = useState<string[]>(["English", "French", "Arabic", "Spanish", "German", "Italian", "Chinese", "Japanese", "Russian", "Portuguese"])
    const [courseCategory, setCourseCategory] = useState<string[]>(["Web Development", "Data Science", "Machine Learning", "Artificial Intelligence"])
    const [courseLevel, setCourseLevel] = useState<string[]>(["beginner", "intermediate", "advanced"])
    const [courseDuration, setCourseDuration] = useState<string[]>(["1-3 hours", "3-6 hours", "6-12 hours", "12-24 hours", "24+ hours"])
    const [selectedPriceRange, setSelectedPriceRange] = useState<Array<number>>([50, 500])
    const [modelrecommendationsSelected, setmodelrecommendationsselected] = useState(false)

    const handleLanguageCheckboxChange = (value: string, isChecked: boolean) => {
        setCourseLanguages((prevSelectedLanguages) => {
            if(isChecked){
                return [...prevSelectedLanguages, value]
            }else{
                return prevSelectedLanguages.filter((item) => item !== value)
            }
        })
    }

    const handleCategoryCheckboxChange = (value: string, isChecked: boolean) => {
        setCourseCategory((prevSelectedCategories) => {
            if(isChecked){
                return [...prevSelectedCategories, value]
            }else{
                return prevSelectedCategories.filter((item) => item !== value)
            }
        })
    }

    const handleLevelCheckboxChange = (value: string, isChecked: boolean) => {
        setCourseLevel((prevSelectedLevels) => {
            if(isChecked){
                return [...prevSelectedLevels, value]
            }else{
                return prevSelectedLevels.filter((item) => item !== value)
            }
        })
    }

    const handleDurationCheckboxChange = (value: string, isChecked: boolean) => {
        setCourseDuration((prevSelectedDurations) => {
            if(isChecked){
                return [...prevSelectedDurations, value]
            }else{
                return prevSelectedDurations.filter((item) => item !== value)
            }
        })
    }

    return(
        <CourseContext.Provider value={{
            courseLanguages,
            courseCategory,
            courseLevel,
            courseDuration,
            handleLanguageCheckboxChange,
            handleCategoryCheckboxChange,
            handleLevelCheckboxChange,
            handleDurationCheckboxChange,
            selectedPriceRange,
            setSelectedPriceRange,
            modelrecommendationsSelected,
            setmodelrecommendationsselected
        }}>
            {children}
        </CourseContext.Provider>
    )
}

export { CourseContext }