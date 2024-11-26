import { AlbumIcon, BrainIcon, CalendarIcon, CircleDollarSignIcon, LanguagesIcon, PaletteIcon, SearchIcon, StarHalfIcon, StarIcon, X } from "lucide-react";
import { useContext, useLayoutEffect, useState } from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { MultiSlider } from "../ui/multiple-slider";
//import InputWithSuggestions from "./InputWithSuggestions";
import { Button } from "../ui/button";

import {CourseContext} from "@/app/context/CourseContext";
import { useSession } from "next-auth/react";

const existingCategories = ["Web Development", "Data Science", "Machine Learning", "Artificial Intelligence"]
const existingLanguages = ["English", "French", "Arabic", "Spanish", "German", "Italian", "Chinese", "Japanese", "Russian", "Portuguese"]
const existinglevels = ["beginner", "intermediate", "advanced"]
const existingDurations = ["1-3 hours", "3-6 hours", "6-12 hours", "12-24 hours", "24+ hours"]

export default function ProductsFiltersSideBar({loading, getCoursesbyFilter, className, inputClassName, setExpanded}: {loading: boolean, className: string, inputClassName: string, setExpanded: any, getCoursesbyFilter: any}){
    const {status} = useSession()
    const { modelrecommendationsSelected, setmodelrecommendationsselected, courseLanguages, courseLevel, courseCategory, courseDuration, handleCategoryCheckboxChange, handleDurationCheckboxChange, handleLanguageCheckboxChange, handleLevelCheckboxChange, selectedPriceRange, setSelectedPriceRange } = useContext(CourseContext)

    return(
        <div className={`${className}`}>         
            <div className="w-full md:hidden flex justify-end pb-4">
                <X className="w-7 h-7 cursor-pointer active:scale-[1.05]" onClick={()=>setExpanded(false)} />
            </div>
            {
                /*
                <InputWithSuggestions query={query} setQuery={setQuery} allNames={allNeonNames}  className={`${inputClassName} mx-auto  mt-2 `} />
                */
            }
            <p className="text-gray-400 font-medium mt-8">Filtres</p>
            {
                status === "authenticated" &&
                <div className="flex gap-2 items-center mt-4">
                    <Checkbox
                        checked={modelrecommendationsSelected}
                        onCheckedChange={(checked) => {setmodelrecommendationsselected(checked)}}
                    />
                    <span className="text-sm capitalize"> Nos Recommendations </span>
                </div>
            }
            <div className="w-full h-px bg-gray-300 mt-4 " />      
            <Accordion type="single" collapsible>
                <AccordionItem value="Category">
                    <AccordionTrigger className="font-medium text-infinity-text_secondary_3"><div className="flex gap-2 items-center"> <AlbumIcon className="text-infinity-purple w-5 h-5" /> All Courses </div></AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-col gap-2 pl-4">
                            {
                                existingCategories.map((category, index) => {
                                    return(
                                        <div className="flex gap-2 items-center" key={index}>
                                            <Checkbox
                                                checked={courseCategory.includes(category)}
                                                onCheckedChange={(checked) => {handleCategoryCheckboxChange(category, checked)}}
                                            />
                                            <span className="text-infinity-text_secondary font-medium"> {category} </span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="Level">
                    <AccordionTrigger className="font-medium text-infinity-text_secondary_3"> <div className="flex gap-2 items-center"> <BrainIcon className="w-5 h-5 text-infinity-purple" /> Level </div> </AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-col gap-2 pl-4">
                            {
                                existinglevels.map((level, index) => {
                                    return(
                                        <div className="flex gap-2 items-center" key={index}>
                                            <Checkbox
                                                checked={courseLevel.includes(level)}
                                                onCheckedChange={(checked) => {handleLevelCheckboxChange(level, checked)}}
                                            />
                                            <span className="text-infinity-text_secondary font-medium capitalize"> {level} </span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="Duration">
                    <AccordionTrigger className="font-medium text-infinity-text_secondary_3"> <div className="flex gap-2 items-center"> <CalendarIcon className="text-infinity-purple h-5 w-5" /> Duration </div> </AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-col gap-2 pl-4">
                            {
                                existingDurations.map((duration, index) => {
                                    return(
                                        <div className="flex gap-2 items-center" key={index}>
                                            <Checkbox
                                                checked={courseDuration.includes(duration)}
                                                onCheckedChange={(checked) => {handleDurationCheckboxChange(duration, checked)}}
                                            />
                                            <span className="text-infinity-text_secondary font-medium"> {duration} </span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="Language">
                    <AccordionTrigger className="font-medium text-infinity-text_secondary_3"> <div className="flex gap-2 items-center"> <LanguagesIcon className="text-infinity-purple h-5 w-5" /> Language </div> </AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-col gap-2 pl-4">
                            {
                                existingLanguages.map((language, index) => {
                                    return(
                                        <div className="flex gap-2 items-center" key={index}>
                                            <Checkbox
                                                checked={courseLanguages.includes(language)}
                                                onCheckedChange={(checked) => {handleLanguageCheckboxChange(language, checked)}}
                                            />
                                            <span className="text-infinity-text_secondary font-medium"> {language} </span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </AccordionContent>
                </AccordionItem>
{
    /*
                    <AccordionItem value="Rating">
                    <AccordionTrigger className="font-medium text-infinity-text_secondary_3"> <div className="flex gap-2 items-center"> <StarIcon className="text-infinity-purple h-5 w-5" /> Rating </div> </AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-col gap-2 pl-4">
                            <div className="flex gap-2 items-center">
                                <Checkbox />
                                <span className="text-infinity-text_secondary font-medium"> 5 Stars </span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <Checkbox />
                                <span className="text-infinity-text_secondary font-medium"> 4 Stars & Up </span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <Checkbox />
                                <span className="text-infinity-text_secondary font-medium"> 3 Stars & Up </span>
                            </div>
                            <div className="flex gap-2 items-center">
                                <Checkbox />
                                <span className="text-infinity-text_secondary font-medium"> 2 Stars & Up </span>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
    */
}
            </Accordion>
            <p className="flex justify-between w-full items-center mt-5">
                <span className="text-infinity-text_secondary_3 text-sm font-medium flex gap-2 items-center">
                    <CircleDollarSignIcon className="w-5 h-5 text-infinity-purple" />
                    <span className="translate-y-px"> Prix </span>
                </span>
                <span className="font-medium text-sm text-white px-2 py-1 bg-red-500/80 rounded-md">
                    {selectedPriceRange[0]} - {[selectedPriceRange[1]]} TND
                </span>
            </p>
            <MultiSlider min={50} max={500} defaultValue={[50, 500]} onValueChange={(e)=>{setSelectedPriceRange(e)}} className="mt-5" />
            <div className="w-full flex justify-between mt-3">
                <span className="text-xs font-medium text-infinity-text_secondary"> Min: {[selectedPriceRange[0]]} TND </span>
                <span className="text-xs font-medium text-infinity-text_secondary"> Max: {selectedPriceRange[1]} TND </span>
            </div>
            <Button disabled={loading} variant={loading ? "secondary" : "default"} onClick={getCoursesbyFilter} className="mt-6 flex items-center gap-2 group"> <span className="group-hover:opacity-80 transition duration-200"> {loading ? "Searching..." : "Search"} </span> <SearchIcon className="w-4 h-4 rotate-90 group-hover:opacity-80 transition duration-200" /> </Button>
        </div>
    )
}