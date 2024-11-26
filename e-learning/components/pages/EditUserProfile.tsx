"use client"
import DragAndDrop from '@/components/Inputs/DragAndDrop'
import { useDropzone } from "react-dropzone";
import React, { useLayoutEffect, useState } from 'react'
import image from "@/components/Images/mentors/mentor3.jpg"
import ProfileProgress from '@/components/Progress/ProfileProgress';
import { CaptionsIcon, CheckIcon, CompassIcon, LanguagesIcon, LibraryBigIcon, MailIcon, PencilLineIcon, PhoneIcon, UserPenIcon, XIcon } from 'lucide-react';
import { User, Image } from '@prisma/client';
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu"
import { toast } from 'sonner';
import { revalidatePath } from 'next/cache';
import { updateClientProfile } from '@/app/actions/UserActions/UpdateUser';
import axios from 'axios';

const existinglanguages = ["English", "French", "Spanish", "German", "Italian"]
const existingCategories = ["Web Development", "Mobile Development", "Data Science", "Machine Learning", "Artificial Intelligence", "Deep Learning","DevOps", "Cloud"]


function EditUserProfile({user}: {user: User & {image: Image}}) {
    const [preview, setPreview] = useState<string | ArrayBuffer | null>(user.image.path)

    const fetchUserImage = async() => {
        if(user.image.location === "local"){
            const response = await axios.post("/api/user/getUserImage", {email: user.email, provider: user.provider})
            setPreview(response.data.image)
        }
    }
    useLayoutEffect(()=>{
        fetchUserImage()
    }, [])
    const onDrop = React.useCallback(
      (acceptedFiles: File[]) => {
        const reader = new FileReader();
        try {
          reader.onload = () => setPreview(reader.result);
          reader.readAsDataURL(acceptedFiles[0])
        } catch (error) {
          setPreview(null);
        }
      },
      [setPreview],
    );
  
    const { getRootProps, getInputProps, isDragActive, fileRejections } =
      useDropzone({
        onDrop,
        maxFiles: 1,
        maxSize: 1000000,
        accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
    });

    const [userForm, setUserForm] = React.useState({
        personalInfo: {
            open: false,
            name: user.name,
            email: user.email,
            phone: user.phone
        },
        preferences: {
            open: false,
            languages: user.preferredLanguages,
            categories: user.preferredCategories
        }
    })

    const handleOpenForm = (field: keyof typeof userForm, value: boolean) => {
        setUserForm({
            ...userForm,
            [field]: {
                ...userForm[field],
                open: value
            }
        })
    }

    const handleSelectPreference = (
        preference: keyof typeof userForm.preferences, 
        value: string, 
        isChecked: boolean
    ) => {
        setUserForm((prevForm) => ({
            ...prevForm,
            preferences: {
                ...prevForm.preferences,
                [preference]: isChecked
                    ? [...prevForm.preferences[preference] as string[], value]
                    : (prevForm.preferences[preference] as string[]).filter((selected) => selected !== value)
            }
        }));
    };
    
    const handleDetailsChagne = (field: keyof typeof userForm.personalInfo, value: string) => {
        setUserForm({
            ...userForm,
            personalInfo: {
                ...userForm.personalInfo,
                [field]: value
            }
        })
    }
    
    const percentages = {
        account: 50,
        photo: 10,
        phone: user.phone ? 10 : 0,
        languages: userForm.preferences.languages.length > 0 ? 15 : 0,
        categories: userForm.preferences.categories.length > 0 ? 15 : 0
    }
    const totalPercentage = Object.values(percentages).reduce((acc, curr) => acc + curr, 0)

    return (
        <div className="grid lg:grid-cols-6 gap-4 w-full max-w-[1500px] mx-auto justify-items-center max-sm:flex max-sm:flex-col max-sm:items-center">
            <div className="py-14 rounded-3xl bg-white mt-4 lg:col-span-4 col-span-3 min-w-full">
                <div className="flex gap-4 items-center px-14 max-sm:px-2 max-sm:justify-center">
                <DragAndDrop preview={preview} setPreview={setPreview} />
                <div className="flex flex-col gap-3 max-sm:hidden">
                    <p {...getRootProps()} className="text-black border-2 font-medium rounded-xl w-fit px-4 text-center py-2 hover:bg-gray-200/20 cursor-pointer transition-all duration-150">
                    <input type="file" {...getInputProps()} maxLength={1} max={1} />
                    Upload new photo
                    </p>
                    <p className="text-gray-400 font-extralight">
                    At least 800 x 800 px recommended. <br/> JPG or PNG is allowed
                    </p>
                </div>
                </div>
                <hr className="mt-16" />
                <div className={`gap-4 grid mx-4 px-8 max-sm:px-2 border rounded-xl mt-4 py-8 ${!userForm.personalInfo.open ? "bg-white" : "bg-[#C0C0C0]/15"}`}>
                    <div className="flex justify-between w-full items-center">
                    <p className="text-slate-800 font-semibold text-lg"> Personal Info </p>
                    {
                        userForm.personalInfo.open ? (
                            <button onClick={(e)=>{e.preventDefault(); handleOpenForm("personalInfo", false)}} className="w-fit h-fit py-2 px-4 text-gray-500 hover:text-gray-600 transition-all duration-150"> 
                                Confirm
                            </button>
                        ) : (
                            <button onClick={(e)=>{e.preventDefault(); handleOpenForm("personalInfo", true)}} className="w-fit h-fit py-2 px-4 text-blue-600 hover:text-blue-700 transition-all duration-150 flex justify-center items-center gap-1"> 
                                Edit
                                <PencilLineIcon className="w-4 h-4" />
                            </button>
                        )
                    }
                    </div>
                    <div className="w-full mt-2 gap-3 flex flex-col">
                        {
                            userForm.personalInfo.open ? (
                                <>  
                                    <div className="flex gap-1 flex-col">
                                        <span className={`${userForm.personalInfo.open ? "text-gray-600" : "text-gray-400"} whitespace-nowrap`}>Full Name</span>
                                        <div className="relative w-full">
                                            <input
                                                type="text"
                                                value={userForm.personalInfo.name as string}
                                                onChange={(e)=>handleDetailsChagne("name", e.target.value)}
                                                className="outline-none peer pl-10 pt-[2px] focus:border-blue-500 appearance-none no-arrows text-sm border-2 rounded-xl h-[2.6rem] focus:caret-indigo-500 w-full"
                                            />
                                            <CaptionsIcon className="top-0 peer-focus:text-blue-500 translate-y-[11px] translate-x-4 absolute w-[1.2rem] h-[1.2rem]" />
                                        </div>
                                    </div>
                                    <div className="flex gap-1 items- flex-col">
                                        <span className={`${userForm.personalInfo.open ? "text-gray-600" : "text-gray-400"} whitespace-nowrap`}>Email Adress</span>
                                        <div className="relative w-full">
                                            <input
                                                type="text"
                                                disabled
                                                value={userForm.personalInfo.email as string}
                                                className="outline-none peer pl-10 pt-[2px] focus:border-blue-500 appearance-none no-arrows text-sm border-2 rounded-xl h-[2.6rem] focus:caret-indigo-500 w-full"
                                            />
                                            <MailIcon className="top-0 peer-focus:text-blue-500 translate-y-[11px] translate-x-4 absolute w-[1.2rem] h-[1.2rem]" />
                                        </div>
                                    </div>
                                    <div className="flex gap-1 items- flex-col">
                                        <span className={`${userForm.personalInfo.open ? "text-gray-600" : "text-gray-400"} whitespace-nowrap`}>Phone Number</span>
                                        <div className="relative w-full">
                                            <input
                                                type="text"
                                                value={userForm.personalInfo.phone as string}
                                                onChange={(e)=>handleDetailsChagne("phone", e.target.value)}
                                                className="outline-none peer pt-[2px] pl-10 focus:border-blue-500 appearance-none no-arrows text-sm border-2 rounded-xl h-[2.6rem] focus:caret-indigo-500 w-full"
                                            />
                                            <PhoneIcon className="top-0 peer-focus:text-blue-500 translate-y-[11px] translate-x-4 absolute w-[1.2rem] h-[1.2rem]" />
                                        </div>
                                    </div>
                                </>
                            )
                            :
                            <>
                                <div className="flex flex-col">
                                    <span className="text-gray-400">Full Name</span>
                                    <span className="text-slate-700">{userForm.personalInfo.name}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-gray-400">Email</span>
                                    <span className="text-slate-700 max-sm:max-w-[200px] truncate">{userForm.personalInfo.email}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-gray-400">Phone</span>
                                    <span className="text-slate-700">{userForm.personalInfo.phone ? userForm.personalInfo.phone : (<span className="text-red-500"> No phone number added </span>)}</span>
                                </div>
                            </>
                        }
                    </div>
                </div>


                <div className={`gap-4 grid mx-4 px-8 max-sm:px-2 border rounded-xl mt-4 py-8 ${!userForm.personalInfo.open ? "bg-white" : "bg-[#C0C0C0]/15"}`}>
                    <div className="flex justify-between w-full items-center">
                    <p className="text-slate-800 font-semibold text-lg"> Course Preferences </p>
                    {
                        userForm.preferences.open ? (
                            <button onClick={(e)=>{e.preventDefault(); handleOpenForm("preferences", false)}} className="w-fit h-fit py-2 px-4 text-gray-500 hover:text-gray-600 transition-all duration-150"> 
                                Confirm
                            </button>
                        ) : (
                            <button onClick={(e)=>{e.preventDefault(); handleOpenForm("preferences", true)}} className="w-fit h-fit py-2 px-4 text-blue-600 hover:text-blue-700 transition-all duration-150 flex justify-center items-center gap-1"> 
                                Edit
                                <PencilLineIcon className="w-4 h-4" />
                            </button>
                        )
                    }
                    </div>
                    <div className="w-full mt-2 gap-3 flex flex-col">
                        {
                            userForm.preferences.open ? (
                                <>  
                                    <div className="flex gap-1 flex-col">
                                    <div className="flex max-sm:flex-col gap-4 items-center w-full">
                                        <p className="whitespace-nowrap sm:w-[25%]">Course Languages</p>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild className="w-full">
                                            <Button variant="outline" className="flex items-center justify-start gap-2 h-[2.5rem]"> 
                                                <LanguagesIcon className="w-[1.2rem] h-[1.2rem] -translate-y-px peer-focus:text-blue-500 transition-all duration-100" /> 
                                                select languages
                                            </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-56">
                                                <DropdownMenuLabel>Languages</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                {existinglanguages.map((lang) => (
                                                    <DropdownMenuCheckboxItem
                                                        checked={userForm.preferences.languages.includes(lang)}
                                                        key={lang}
                                                        onCheckedChange={(isChecked) => handleSelectPreference("languages", lang, isChecked)}
                                                    >
                                                    {lang}
                                                    </DropdownMenuCheckboxItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    </div>
                                    <div className="flex max-sm:flex-col gap-4 items-center w-full">
                                        <p className="whitespace-nowrap sm:w-[25%]">Course Category</p>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild className="w-full">
                                            <Button variant="outline" className="flex items-center justify-start gap-2 h-[2.5rem]"> 
                                                <LibraryBigIcon className="w-[1.2rem] h-[1.2rem] -translate-y-px peer-focus:text-blue-500 transition-all duration-100" /> 
                                                select categories
                                            </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-56">
                                                <DropdownMenuLabel>Categories</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                {existingCategories.map((category) => (
                                                    <DropdownMenuCheckboxItem
                                                        checked={userForm.preferences.categories.includes(category)}
                                                        key={category}
                                                        onCheckedChange={(isChecked) => handleSelectPreference("categories", category, isChecked)}
                                                    >
                                                    {category}
                                                    </DropdownMenuCheckboxItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </>
                            )
                            :
                            <>
                                <div className="flex flex-col">
                                    <span className="text-gray-400">Languages</span>
                                    <span className="text-slate-700">{userForm.preferences.languages.length > 0 ? userForm.preferences.languages.join(", ") : (<span className="text-red-500"> No languages preferences added </span>)}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-gray-400">Courses Categories</span>
                                    <span className="text-slate-700">{userForm.preferences.categories.length > 0 ? userForm.preferences.categories.join(", ") : (<span className="text-red-500"> No categories preferences added </span>)}</span>
                                </div>
                            </>
                        }
                    </div>
                    
                </div>
                <form
                    action={
                        async(formdata: FormData) => {
                            try{
                                formdata.append("name", userForm.personalInfo.name as string)
                                formdata.append("email", userForm.personalInfo.email as string)
                                formdata.append("provider", user.provider as string)
                                formdata.append("phone", userForm.personalInfo.phone || "")
                                formdata.append("image", preview as string)
                                userForm.preferences.languages.forEach(lang => formdata.append("languages", lang))
                                userForm.preferences.categories.forEach(category => formdata.append("categories", category))
                                const response = await updateClientProfile(formdata)
                                if(response?.success === false){
                                    toast("Sorry", {
                                        description:"an error has occured.",
                                        action: {
                                            label: "Retry",
                                            onClick: () => {},
                                        },
                                    });
                                }
                                if(response.success){
                                    toast("Success", {
                                        description: "Profile updated successfully",
                                        action: {
                                            label: "Ok",
                                            onClick: () => {},
                                        },
                                    });
                                }
                            }catch(err){
                                toast("Sorry", {
                                    description: "an internal error has occured",
                                    action: {
                                        label: "Revalidate",
                                        onClick: () => {},
                                    },
                                })
                            }
                        }
                    }
                    className="flex sm:justify-end px-4"
                >
                    <button
                        type='submit'
                        className="max-sm:w-full whitespace-nowrap px-4 py-2 w-fit h-fit text-white bg-blue-600 rounded-lg hover:bg-blue-700/90 active:bg-blue-700 transition-all duration-150 mt-4"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
            <div className="p-8 rounded-3xl bg-white mt-4 flex flex-col justify-center items-center gap-4 h-fit w-max col-span-2">
                <h1 className="text-lg font-semibold">
                Complete your profile
                </h1>
                <ProfileProgress value={totalPercentage} />
                <div className="flex flex-col gap-2">
                    <p className="gap-2 flex items-center font-medium text-slate-900">
                        <CheckIcon className="" />
                        <span>Setup Account</span>
                        <span className="text-gray-400">50%</span>
                    </p>
                    <p className="gap-2 flex items-center font-medium text-slate-900">
                        <CheckIcon className="" />
                        <span>Upload your photo</span>
                        <span className="text-gray-400">10%</span>
                    </p>
                    <p className={`gap-2 flex items-center font-medium ${percentages.phone === 10 ? "text-slate-900" : "text-gray-400"}`}>
                        {
                            percentages.phone === 10 ? <CheckIcon className="" /> : <XIcon className="" />
                        }
                        <span> Phone Number </span>
                        <span className={`${percentages.phone === 10 ? "text-gray-400" : "text-green-500"} font-semibold`}>{!(percentages.phone === 10) ? "+" : ""}10%</span>
                    </p>
                    <p className={`gap-2 flex items-center font-medium ${percentages.languages === 15 ? "text-slate-900" : "text-gray-400"}`}>
                        {
                            percentages.languages === 15 ? <CheckIcon className="" /> : <XIcon className="" />
                        }
                        <span>Languages</span>
                        <span className={`${percentages.languages === 15 ? "text-gray-400" : "text-green-500"} font-semibold`}>{!(percentages.languages === 15) ? "+" : ""}15%</span>
                    </p>
                    <p className={`gap-2 flex items-center font-medium ${percentages.languages === 15 ? "text-slate-900" : "text-gray-400"}`}>
                        {
                            percentages.categories === 15 ? <CheckIcon className="" /> : <XIcon className="" />
                        }
                        <span>Categories</span>
                        <span className={`${percentages.categories === 15 ? "text-gray-400" : "text-green-500"} font-semibold`}>{!(percentages.categories === 15) ? "+" : ""}15%</span>
                    </p>
                </div>
            </div>
            </div>
    )
}

export default EditUserProfile