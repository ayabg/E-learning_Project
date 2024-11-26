"use client";
import React, { useLayoutEffect } from "react";
import { useDropzone } from "react-dropzone";
import { CaptionsIcon, CircleDollarSignIcon, CompassIcon, LanguagesIcon, PencilLineIcon, PlusCircle, UserPenIcon } from "lucide-react";
import CourseThumbnailDragAndDrop from "@/components/Inputs/CourseThumbnailDragAndDrop";
import MentorEditCourseAccordion from "@/components/Accordions/MentorEditCourseAccordion";
import axios from "axios";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { json } from "stream/consumers";
import { UpdateCourse } from "@/app/actions/CourseActions/UpdateCourse";
import { toast } from "sonner";

const existinglanguages = ["English", "French", "Spanish", "German", "Italian"]
const existingCategories = ["Web Development", "Mobile Development", "Data Science", "Machine Learning", "Artificial Intelligence"]


function EditCoursePageMentor({course}: {course: any}) {

    const [courseForm, setCurseForm] = React.useState({
        title: {
            open: false,
            data: course.title
        },
        price: {
            open: false,
            data: course.price
        },
        description: {
            open: false,
            data: course.description
        },
        language: {
            open: false,
            data: course.language
        },
        difficulty: {
            open: false,
            data: course.difficulty
        },
        category: {
            open: false,
            data: course.category
        },
        image: {
            open: false,
            data: null
        }
    })

    const changeFormOpenStatus = (field: keyof typeof courseForm) => {
        setCurseForm(prev => {
            return {
                ...prev,
                [field]: {
                    ...prev[field],
                    open: !prev[field].open
                }
            }
        })
    }

    const changeFormData = (field: keyof typeof courseForm, value: string | number | ArrayBuffer | null) => {
        setCurseForm(prev => {
            return {
                ...prev,
                [field]: {
                    ...prev[field],
                    data: value
                }
            }
        })
    }

    const getCourseThumbnail = async() => {
        const response = await axios.post("/api/courses/getcoursethumbnail", {courseID: course.id})
        const {ImageData} = response.data
        changeFormData("image", ImageData)
    }

    useLayoutEffect(()=>{
        getCourseThumbnail()
    }, [course.id])

    const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
        const reader = new FileReader();
        try {
        reader.onload = () => changeFormData("image", reader.result);
        reader.readAsDataURL(acceptedFiles[0]);
        } catch (error) {
            changeFormData("image", null);
        }
    },
    [changeFormData]
    );

    const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
        onDrop,
        maxFiles: 1,
        maxSize: 1000000,
        accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
    });

    console.log(courseForm)

  return (
    <div className="grid lg:grid-cols-6 gap-4 w-full max-w-[1500px] mx-auto justify-items-center max-sm:flex max-sm:flex-col max-sm:items-center">
        <form
            action={
                async(formdata: FormData) => {
                    try{
                        formdata.append("courseId", course.id)
                        formdata.append("title", courseForm.title.data as string)
                        formdata.append("price", courseForm.price.data as string)
                        formdata.append("description", courseForm.description.data as string)
                        formdata.append("language", courseForm.language.data as string)
                        formdata.append("difficulty", courseForm.difficulty.data as string)
                        formdata.append("category", courseForm.category.data as string)
                        formdata.append("image", JSON.stringify(courseForm.image.data || ""))
                        const response = await UpdateCourse(formdata)
                        if(response?.success === false){
                            toast("Sorry", {
                                description: response?.error || "an error has occured.",
                                action: {
                                    label: "Retry",
                                    onClick: () => {},
                                },
                            });
                        }
                        if(response.success){
                            toast("Success", {
                                description: "Course updated successfully",
                                action: {
                                    label: "Ok",
                                    onClick: () => {},
                                },
                            });
                            window.location.reload()
                        }
                    }catch(err: any){
                        toast("Sorry", {
                            description: err?.message || "an error has occured.",
                            action: {
                                label: "Retry",
                                onClick: () => {},
                            },
                        });
                    }
                }
            } 
            className="py-8 rounded-3xl bg-white mt-4 lg:col-span-4 col-span-3 min-w-full"
        >
        <div className="grid gap-4 mx-4 max-sm:mx-2 px-8 max-sm:px-2 border rounded-xl mt-4 py-8">
            <div className="">
            <div className="flex justify-between w-full items-center">
                <p className="text-slate-800 font-semibold text-lg">
                Thumbnail
                </p>
                <p {...getRootProps()} className="w-fit h-fit cursor-pointer py-2 px-4 flex border rounded-lg gap-2 hover:bg-gray-200/30 transition-all duration-150">
                <input
                    type="file"
                    {...getInputProps()}
                    maxLength={1}
                    max={1}
                />
                <PencilLineIcon className="w-[1.1rem] h-[1.1rem] translate-y-[2px]" />
                Edit
                </p>
            </div>
            </div>
            <div className="mt-4">
            <CourseThumbnailDragAndDrop preview={courseForm.image.data} setPreview={changeFormData} />
            </div>
        </div>
        <div className={`grid gap-4 mx-4 max-sm:mx-2 px-8 max-sm:px-2 border rounded-xl mt-4 py-8 ${!courseForm.title.open ? "bg-white" : "bg-[#C0C0C0]/15"}`}>
            <div className="flex justify-between w-full items-center">
            <p className="text-slate-800 font-semibold text-lg">
                Course Title
            </p>
            {
                courseForm.title.open ? (
                    <button onClick={(e)=>{changeFormOpenStatus("title"); changeFormData("title", course.title);e.preventDefault() }} className="w-fit h-fit py-2 px-4 text-gray-500 hover:text-gray-600 transition-all duration-150">
                        Cancel
                    </button>
                )
                :
                    <button onClick={(e)=>{changeFormOpenStatus("title");e.preventDefault()}} className="w-fit h-fit cursor-pointer py-2 px-4 flex border rounded-lg gap-2 hover:bg-gray-200/30 transition-all duration-150">
                        <PencilLineIcon className="w-[1.1rem] h-[1.1rem] translate-y-[2px]" />
                        Edit
                    </button>
            }
            </div>
            <div className="flex max-sm:flex-col gap-2 items-center w-full">
                {
                    courseForm.title.open ? (
                        <div className="relative w-full">
                            <input
                                type="text"
                                className="outline-none peer focus:border-blue-500 appearance-none text-sm border-2 rounded-xl h-[2.6rem] pl-10 focus:caret-indigo-500 w-full"
                                value={courseForm.title.data}
                                onChange={(e)=>changeFormData("title", e.target.value)}
                            />
                            <CaptionsIcon className="top-0 translate-y-[11px] translate-x-2 absolute w-[1.2rem] h-[1.2rem] peer-focus:text-blue-500" />
                        </div>
                    )
                    :
                    <p className="pl-8 font-medium text-gray-500">
                        {courseForm.title.data}
                    </p>
                }
                {
                    courseForm.title.open && (
                        <button onClick={(e)=>{changeFormOpenStatus("title");e.preventDefault()}} className="max-sm:w-full whitespace-nowrap px-4 py-2 w-fit h-fit text-white bg-blue-600 rounded-lg hover:bg-blue-700/90 active:bg-blue-700 transition-all duration-150">
                            {" "} Confirm {" "}
                        </button>
                    )
                }
            </div>
        </div>
        <div className={`grid gap-4 mx-4 max-sm:mx-2 px-8 max-sm:px-2 border rounded-xl mt-4 py-8 ${!courseForm.description.open ? "bg-white" : "bg-[#C0C0C0]/15"}`}>
            <div className="flex justify-between w-full items-center">
            <p className="text-slate-800 font-semibold text-lg">
                Course Description
            </p>
            {
                courseForm.description.open ? (
                    <button onClick={(e)=>{changeFormOpenStatus("description"); changeFormData("description", course.description);e.preventDefault()}} className="w-fit h-fit py-2 px-4 text-gray-500 hover:text-gray-600 transition-all duration-150">
                        Cancel
                    </button>
                )
                :
                    <button onClick={(e)=>{changeFormOpenStatus("description");e.preventDefault()}} className="w-fit h-fit cursor-pointer py-2 px-4 flex border rounded-lg gap-2 hover:bg-gray-200/30 transition-all duration-150">
                        <PencilLineIcon className="w-[1.1rem] h-[1.1rem] translate-y-[2px]" />
                        Edit
                    </button>
            }
            </div>
            <div className="flex flex-col gap-2 w-full">
                {
                    courseForm.description.open ? (
                        <div className="relative w-full">
                            <textarea
                                className="outline-none peer focus:border-blue-500 appearance-none text-sm border-2 rounded-xl h-[8rem] pl-10 pt-2 focus:caret-indigo-500 w-full"
                                value={courseForm.description.data}
                                onChange={(e)=>changeFormData("description", e.target.value)}
                            />
                            <CaptionsIcon className="top-0 translate-y-[11px] translate-x-3 absolute w-5 h-5 peer-focus:text-blue-500" />
                        </div>
                    )
                    :
                    <p className="pl-8 font-medium text-gray-500 max-w-[48rem] break-words">
                        {courseForm.description.data}
                    </p>
                }
                {
                    courseForm.description.open && (
                        <div className="w-full flex sm:justify-end">
                            <button onClick={(e)=>{changeFormOpenStatus("description");e.preventDefault()}} className="max-sm:w-full whitespace-nowrap px-4 py-2 w-fit h-fit text-white bg-blue-600 rounded-lg hover:bg-blue-700/90 active:bg-blue-700 transition-all duration-150">
                                {" "} Confirm {" "}
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
        <div className="gap-4 grid mx-4 px-8 max-sm:px-2 border rounded-xl mt-8 py-8">
            <div className="flex justify-between w-full items-center">
            <p className="text-slate-800 font-semibold text-lg">
                Lessons
            </p>
            <a className="w-fit h-fit py-2 px-4 flex border rounded-lg gap-2 hover:bg-gray-200/30 transition-all duration-150" href={`/mentor-profile/courses/addlesson?coursename=${course.title}&courseid=${course.id}`}>
                <PlusCircle className="w-[1.2rem] h-[1.2rem] translate-y-[2px]" />
                Add Lesson
            </a>
            </div>
            <MentorEditCourseAccordion lessons={course.lessons} coursename={course.title} />
        </div>
        <div className={`grid gap-4 mx-4 max-sm:mx-2 px-8 max-sm:px-2 border rounded-xl mt-4 py-8 ${!courseForm.price.open ? "bg-white" : "bg-[#C0C0C0]/15"}`}>
            <div className="flex justify-between w-full items-center">
            <p className="text-slate-800 font-semibold text-lg">
                Course Price
            </p>
            {
                courseForm.price.open ? (
                    <button onClick={(e)=>{changeFormOpenStatus("price"); changeFormData("price", course.price);e.preventDefault()}} className="w-fit h-fit py-2 px-4 text-gray-500 hover:text-gray-600 transition-all duration-150">
                        Cancel
                    </button>
                )
                :
                    <button onClick={(e)=>{changeFormOpenStatus("price");e.preventDefault()}} className="w-fit h-fit cursor-pointer py-2 px-4 flex border rounded-lg gap-2 hover:bg-gray-200/30 transition-all duration-150">
                        <PencilLineIcon className="w-[1.1rem] h-[1.1rem] translate-y-[2px]" />
                        Edit
                    </button>
            }
            </div>
            <div className="flex max-sm:flex-col gap-2 items-center w-full">
                {
                    courseForm.price.open ? (
                        <div className="relative w-full">
                            <input
                                type="number"
                                className="outline-none peer pl-10 focus:border-blue-500 appearance-none no-arrows text-sm border-2 rounded-xl h-[2.6rem] focus:caret-indigo-500 w-full"
                                value={courseForm.price.data}
                                onChange={(e)=>changeFormData("price", parseInt(e.target.value))}
                            />
                            <CircleDollarSignIcon className="top-0 peer-focus:text-blue-500 translate-y-[11px] translate-x-2 absolute w-[1.2rem] h-[1.2rem]" />
                        </div>
                    )
                    :
                    <p className="pl-8 font-medium text-gray-500">
                        {courseForm.price.data} TND
                    </p>
                }
                {
                    courseForm.price.open && (
                        <button onClick={(e)=>{changeFormOpenStatus("price");e.preventDefault()}} className="max-sm:w-full whitespace-nowrap px-4 py-2 w-fit h-fit text-white bg-blue-600 rounded-lg hover:bg-blue-700/90 active:bg-blue-700 transition-all duration-150">
                            {" "} Confirm {" "}
                        </button>
                    )
                }
            </div>
        </div>
        <div className={`grid gap-4 mx-4 max-sm:mx-2 px-8 max-sm:px-2 border rounded-xl mt-4 py-8 ${!courseForm.language.open ? "bg-white" : "bg-[#C0C0C0]/15"}`}>
            <div className="flex justify-between w-full items-center">
            <p className="text-slate-800 font-semibold text-lg"> Course Language </p>
            {
                courseForm.language.open ? (
                    <button onClick={(e)=>{changeFormOpenStatus("language"); changeFormData("language", course.language);e.preventDefault()}} className="w-fit h-fit py-2 px-4 text-gray-500 hover:text-gray-600 transition-all duration-150">
                        Cancel
                    </button>
                )
                :
                    <button onClick={(e)=>{changeFormOpenStatus("language");e.preventDefault()}} className="w-fit h-fit cursor-pointer py-2 px-4 flex border rounded-lg gap-2 hover:bg-gray-200/30 transition-all duration-150">
                        <PencilLineIcon className="w-[1.1rem] h-[1.1rem] translate-y-[2px]" />
                        Edit
                    </button>
            }
            </div>
            <div className="flex max-sm:flex-col gap-2 items-center w-full">
            {
            courseForm.language.open ?
            <div className="relative w-full">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className="w-full">
                    <Button variant="outline" className="flex items-center justify-start gap-2 h-[2.6rem]"> 
                        <LanguagesIcon className="w-[1.2rem] h-[1.2rem] peer-focus:text-blue-500 transition-all duration-100" /> 
                        { courseForm.language.data ? courseForm.language.data :  "Choose language"}
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Languages</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {existinglanguages.map((language) => (
                        <DropdownMenuItem
                        onSelect={() => changeFormData("language", language)}
                        key={language}
                        >
                        {language}
                        </DropdownMenuItem>
                    ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <LanguagesIcon className="top-0 peer-focus:text-blue-500 translate-y-[11px] translate-x-2 absolute w-[1.2rem] h-[1.2rem]" />
            </div>
            :
            <p className="pl-8 font-medium text-gray-500">
                {courseForm.language.data}
            </p>
            }
            {
                courseForm.language.open && (
                    <button onClick={(e)=>{changeFormOpenStatus("language");e.preventDefault()}} className="max-sm:w-full whitespace-nowrap px-4 py-2 w-fit h-fit text-white bg-blue-600 rounded-lg hover:bg-blue-700/90 active:bg-blue-700 transition-all duration-150">
                        {" "} Confirm {" "}
                    </button>
                )
            }
            </div>
            
        </div>


        <div className={`grid gap-4 mx-4 max-sm:mx-2 px-8 max-sm:px-2 border rounded-xl mt-4 py-8 ${!courseForm.category.open ? "bg-white" : "bg-[#C0C0C0]/15"}`}>
            <div className="flex justify-between w-full items-center">
            <p className="text-slate-800 font-semibold text-lg"> Course Category </p>
            {
                courseForm.category.open ? (
                    <button onClick={(e)=>{changeFormOpenStatus("category"); changeFormData("category", course.category);e.preventDefault()}} className="w-fit h-fit py-2 px-4 text-gray-500 hover:text-gray-600 transition-all duration-150">
                        Cancel
                    </button>
                )
                :
                    <button onClick={(e)=>{changeFormOpenStatus("category");e.preventDefault()}} className="w-fit h-fit cursor-pointer py-2 px-4 flex border rounded-lg gap-2 hover:bg-gray-200/30 transition-all duration-150">
                        <PencilLineIcon className="w-[1.1rem] h-[1.1rem] translate-y-[2px]" />
                        Edit
                    </button>
            }
            </div>
            <div className="flex max-sm:flex-col gap-2 items-center w-full">
            {
            courseForm.category.open ?
            <div className="relative w-full">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className="w-full">
                    <Button variant="outline" className="flex items-center justify-start gap-2 h-[2.6rem]"> 
                        <LanguagesIcon className="w-[1.2rem] h-[1.2rem] peer-focus:text-blue-500 transition-all duration-100" /> 
                        { courseForm.category.data ? courseForm.category.data :  "Choose category"}
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Categories</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {existingCategories.map((category) => (
                        <DropdownMenuItem
                        onSelect={() => changeFormData("category", category)}
                        key={category}
                        >
                        {category}
                        </DropdownMenuItem>
                    ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <LanguagesIcon className="top-0 peer-focus:text-blue-500 translate-y-[11px] translate-x-2 absolute w-[1.2rem] h-[1.2rem]" />
            </div>
            :
            <p className="pl-8 font-medium text-gray-500">
                {courseForm.category.data}
            </p>
            }
            {
                courseForm.category.open && (
                    <button onClick={(e)=>{changeFormOpenStatus("category");e.preventDefault()}} className="max-sm:w-full whitespace-nowrap px-4 py-2 w-fit h-fit text-white bg-blue-600 rounded-lg hover:bg-blue-700/90 active:bg-blue-700 transition-all duration-150">
                        {" "} Confirm {" "}
                    </button>
                )
            }
            </div>
            
        </div>


        <div className={`grid gap-4 mx-4 max-sm:mx-2 px-8 max-sm:px-2 border rounded-xl mt-4 py-8 ${!courseForm.difficulty.open ? "bg-white" : "bg-[#C0C0C0]/15"}`}>
            <div className="flex justify-between w-full items-center">
            <p className="text-slate-800 font-semibold text-lg"> Course Difficulty </p>
            {
                courseForm.difficulty.open ? (
                    <button onClick={(e)=>{changeFormOpenStatus("difficulty"); changeFormData("difficulty", course.difficulty);e.preventDefault()}} className="w-fit h-fit py-2 px-4 text-gray-500 hover:text-gray-600 transition-all duration-150">
                        Cancel
                    </button>
                )
                :
                    <button onClick={(e)=>{changeFormOpenStatus("difficulty");e.preventDefault()}} className="w-fit h-fit cursor-pointer py-2 px-4 flex border rounded-lg gap-2 hover:bg-gray-200/30 transition-all duration-150">
                        <PencilLineIcon className="w-[1.1rem] h-[1.1rem] translate-y-[2px]" />
                        Edit
                    </button>
            }
            </div>
            <div className="flex max-sm:flex-col gap-2 items-center w-full">
            {
            courseForm.difficulty.open ?
            <div className="relative w-full">
                <RadioGroup
                    defaultValue={courseForm.difficulty.data}
                    onValueChange={(e) => changeFormData("difficulty", e)}
                    className="flex gap-2 items-center"
                    >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="beginner" id="r1" />
                        <Label htmlFor="r1">Beginner</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="intermediate" id="r2" />
                        <Label htmlFor="r2">Intermediate</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="advanced" id="r3" />
                        <Label htmlFor="r3">Advanced</Label>
                    </div>
                </RadioGroup>
            </div>
            :
            <p className="pl-8 font-medium text-gray-500 capitalize">
                {courseForm.difficulty.data}
            </p>
            }
            
            {
                courseForm.difficulty.open && (
                    <button onClick={(e)=>{changeFormOpenStatus("difficulty");e.preventDefault()}} className="max-sm:w-full whitespace-nowrap px-4 py-2 w-fit h-fit text-white bg-blue-600 rounded-lg hover:bg-blue-700/90 active:bg-blue-700 transition-all duration-150">
                        {" "} Confirm {" "}
                    </button>
                )
            }
            </div>
        </div>
        <div className="w-full flex justify-center items-center mt-4">
            <button type="submit" className="bg-violet-700 text-white px-4 py-2 max-sm:w-full w-fit max-sm:mx-4 rounded-lg">
                Save Changes
            </button>
        </div>
        </form>
    </div>
  )
}

export default EditCoursePageMentor