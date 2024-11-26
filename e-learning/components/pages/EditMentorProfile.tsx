"use client"
import ProfileProgress from '@/components/Progress/ProfileProgress';
import { BriefcaseBusinessIcon, CaptionsIcon, CheckIcon, CircleDollarSignIcon, CompassIcon, MailIcon, PencilLineIcon, Phone, PhoneIcon, TextIcon, UserPenIcon, XIcon } from 'lucide-react';
import { useDropzone } from "react-dropzone";
import DragAndDrop from '@/components/Inputs/DragAndDrop'
import { useCallback, useLayoutEffect, useState } from "react";
import { Image, User } from "@prisma/client";
import { toast } from 'sonner';
import { updateUserProfile } from '@/app/actions/UserActions/UpdateUser';
import axios from 'axios';

type UserWithImage = User & {image: Image}

function EditMentorProfile({user}: {user: UserWithImage}) {

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
    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
        const reader = new FileReader();
        try {
            reader.onload = () => setPreview(reader.result);
            reader.readAsDataURL(acceptedFiles[0]);
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

    const [userForm, setUserForm] = useState({
        generalInfo: {
            open: false,
            data: {
                name: user.name,
                job: user.job,
                email: user.email,
                phone: user.phone || "",
            }
        },
        location: {
            value: user.location || "",
            open: false
        },
        bio: {
            value: user.bio || "",
            open: false
        }
    })


    const handleGeneralInfoOpen = (value: boolean) => {
        setUserForm({
            ...userForm,
            generalInfo: {
                ...userForm.generalInfo,
                open: value
            }
        })
    }

    const handleGeneralInfo = (value: string, field: keyof typeof userForm.generalInfo.data) => {
        setUserForm({
            ...userForm,
            generalInfo: {
                ...userForm.generalInfo,
                data: {
                    ...userForm.generalInfo.data,
                    [field]: value
                }
            }
        });
    };

    const openBioOrLocation = (field: keyof typeof userForm, value: boolean) => {
        setUserForm({
            ...userForm,
            [field]: {
                ...userForm[field],
                open: value
            }
        })
    }

    const handleBioOrLocation = (value: string, field: keyof typeof userForm) => {
        setUserForm({
            ...userForm,
            [field]: {
                ...userForm[field],
                value: value
            }
        })
    }

    const percentages = {
        account: 50,
        photo: 10,
        phone: user.phone && user.phone.length > 0 ? 10 : 0,
        location: user.location && user.location.length > 0 ? 10 : 0,
        bio: user.bio && user.bio.length > 0 ? 20 : 0
    }
    const totalPercentage = Object.values(percentages).reduce((acc, curr) => acc + curr, 0)
    return (
        <form
            action={
                async(formdata: FormData) => {
                    try{
                        formdata.append("name", userForm.generalInfo.data.name as string)   
                        formdata.append("phone", userForm.generalInfo.data.phone as string)
                        formdata.append("location", userForm.location.value as string)
                        formdata.append("bio", userForm.bio.value as string)
                        formdata.append("image", preview as string)
                        formdata.append("email", user.email)
                        formdata.append("provider", user.provider)

                        const response = await updateUserProfile(formdata)
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
                                description: "Profile updated successfully",
                                action: {
                                    label: "Ok",
                                    onClick: () => {},
                                },
                            });
                            window.location.reload()
                        }
                    }catch(err){
                        toast("An internal error has occured", {
                            description: "Please try again later",
                            action: {
                                label: "Close",
                                onClick: () => {},
                            }
                        })
                    }
                }
            }
            className="grid lg:grid-cols-6 gap-4 w-full max-w-[1500px] mx-auto justify-items-center max-sm:flex max-sm:flex-col max-sm:items-center"
        >
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
            <div className={`gap-4 grid mx-4 px-8 max-sm:px-2 border rounded-xl mt-4 py-8 ${!userForm.generalInfo.open ? "bg-white" : "bg-[#C0C0C0]/15"}`}>
                <div className="flex justify-between w-full items-center">
                <p className="text-slate-800 font-semibold text-lg"> Personal Info </p>
                {
                    userForm.generalInfo.open ? (
                        <button onClick={(e)=>{e.preventDefault(); handleGeneralInfoOpen(false)}} className="w-fit h-fit py-2 px-4 text-gray-500 hover:text-gray-600 transition-all duration-150"> 
                            Confirm
                        </button>
                    ) : (
                        <button onClick={(e)=>{e.preventDefault(); handleGeneralInfoOpen(true)}} className="w-fit h-fit py-2 px-4 text-blue-600 hover:text-blue-700 transition-all duration-150 flex justify-center items-center gap-1"> 
                            Edit
                            <PencilLineIcon className="w-4 h-4" />
                        </button>
                    )
                }
                </div>
                <div className="w-full mt-2 gap-3 flex flex-col">
                    {
                        userForm.generalInfo.open ? (
                            <>  
                                <div className="flex gap-1 flex-col">
                                    <span className={`${userForm.generalInfo.open ? "text-gray-600" : "text-gray-400"} whitespace-nowrap`}>Full Name</span>
                                    <div className="relative w-full">
                                        <input
                                            type="text"
                                            value={userForm.generalInfo.data.name as string}
                                            onChange={(e) => handleGeneralInfo(e.target.value, "name")}
                                            className="outline-none peer pl-10 pt-[2px] focus:border-blue-500 appearance-none no-arrows text-sm border-2 rounded-xl h-[2.6rem] focus:caret-indigo-500 w-full"
                                        />
                                        <CaptionsIcon className="top-0 peer-focus:text-blue-500 translate-y-[11px] translate-x-4 absolute w-[1.2rem] h-[1.2rem]" />
                                    </div>
                                </div>
                                <div className="flex gap-1 items- flex-col">
                                    <span className={`${userForm.generalInfo.open ? "text-gray-600" : "text-gray-400"} whitespace-nowrap`}>Job Title</span>
                                    <div className="relative w-full">
                                        <input
                                            type="text"
                                            value={userForm.generalInfo.data.job as string}
                                            onChange={(e) => handleGeneralInfo(e.target.value, "job")}
                                            className="outline-none peer pl-10 pt-[2px] focus:border-blue-500 appearance-none no-arrows text-sm border-2 rounded-xl h-[2.6rem] focus:caret-indigo-500 w-full"
                                        />
                                        <BriefcaseBusinessIcon className="top-0 peer-focus:text-blue-500 translate-y-[11px] translate-x-4 absolute w-[1.2rem] h-[1.2rem]" />
                                    </div>
                                </div>
                                <div className="flex gap-1 items- flex-col">
                                    <span className={`${userForm.generalInfo.open ? "text-gray-600" : "text-gray-400"} whitespace-nowrap`}>Email Adress</span>
                                    <div className="relative w-full">
                                        <input
                                            type="text"
                                            disabled
                                            value={userForm.generalInfo.data.email as string}
                                            className="outline-none peer pl-10 pt-[2px] focus:border-blue-500 appearance-none no-arrows text-sm border-2 rounded-xl h-[2.6rem] focus:caret-indigo-500 w-full"
                                        />
                                        <MailIcon className="top-0 peer-focus:text-blue-500 translate-y-[11px] translate-x-4 absolute w-[1.2rem] h-[1.2rem]" />
                                    </div>
                                </div>
                                <div className="flex gap-1 items- flex-col">
                                    <span className={`${userForm.generalInfo.open ? "text-gray-600" : "text-gray-400"} whitespace-nowrap`}>Phone Number</span>
                                    <div className="relative w-full">
                                        <input
                                            type="text"
                                            value={userForm.generalInfo.data.phone as string}
                                            onChange={(e) => handleGeneralInfo(e.target.value, "phone")}
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
                                <span className="text-slate-700">{userForm.generalInfo.data.name}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-400">Job Title</span>
                                <span className="text-slate-700">{userForm.generalInfo.data.job}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-400">Email</span>
                                <span className="text-slate-700 max-sm:max-w-[200px] truncate">{userForm.generalInfo.data.email}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-gray-400">Phone</span>
                                <span className="text-slate-700">{userForm.generalInfo.data.phone ? userForm.generalInfo.data.phone : (<span className="text-red-500"> No phone number added </span>)}</span>
                            </div>
                        </>
                    }
                </div>
            </div>
            <div className={`gap-4 grid mx-4 px-8 max-sm:px-2 border rounded-xl mt-4 py-8 ${!userForm.location.open ? "bg-white" : "bg-[#C0C0C0]/15"}`}>
                <div className="flex justify-between w-full items-center">
                    <p className="text-slate-800 font-semibold text-lg"> Location </p>
                    {
                        !userForm.location.open &&(
                            <button onClick={(e)=>{e.preventDefault(); openBioOrLocation("location", true)}} className="w-fit h-fit py-2 px-4 text-blue-600 hover:text-blue-700 transition-all duration-150 flex justify-center items-center gap-1"> 
                                Edit
                                <PencilLineIcon className="w-4 h-4" />
                            </button>
                        )
                    }
                    </div>
                    {
                        userForm.location.open ? (
                            <div className="flex max-sm:flex-col gap-2 items-center w-full">
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        value={userForm.location.value as string}
                                        onChange={(e)=>handleBioOrLocation(e.target.value, "location")}
                                        className="outline-none peer focus:border-blue-500 text-sm border-2 rounded-xl h-[2.6rem] pl-10 pt-[2px] focus:caret-indigo-500 w-full" />
                                    <CompassIcon className="top-0 peer-focus:text-blue-500 translate-y-[9px] translate-x-2 absolute" />
                                </div>
                                <button onClick={(e)=>{e.preventDefault(); openBioOrLocation("location", false)}} className="max-sm:w-full whitespace-nowrap px-4 py-2 w-fit h-fit text-white bg-blue-600 rounded-lg hover:bg-blue-700/90 active:bg-blue-700 transition-all duration-150"> Confirm Changes </button>
                            </div>
                        )
                        :
                        (
                            <span className="text-slate-700">{userForm.location.value ? userForm.location.value : (<span className="text-red-500"> No location added </span>)}</span>
                        )
                    }
                </div>
                <div className="grid gap-4 mx-4 max-sm:mx-2 px-8 max-sm:px-2 border rounded-xl mt-4 py-8">
                    <div className="flex justify-between w-full items-center">
                        <p className="text-slate-800 font-semibold text-lg"> Bio </p>
                        {
                            userForm.bio.open ? (
                                <button onClick={(e)=>{e.preventDefault(); openBioOrLocation("bio", false)}} className="w-fit h-fit py-2 px-4 text-gray-500 hover:text-gray-600 transition-all duration-150"> 
                                    Confirm
                                </button>
                            ) : (
                                <button onClick={(e)=>{e.preventDefault(); openBioOrLocation("bio", true)}} className="w-fit h-fit py-2 px-4 text-blue-600 hover:text-blue-700 transition-all duration-150 flex justify-center items-center gap-1"> 
                                    Edit
                                    <PencilLineIcon className="w-4 h-4" />
                                </button>
                            )
                        }
                        </div>
                        <div className="relative w-full">
                            {
                                userForm.bio.open ? (
                                    <div className="relative w-full">
                                    <textarea
                                        value={userForm.bio.value as string}
                                        onChange={(e)=>handleBioOrLocation(e.target.value, "bio")}
                                        className="border-2 rounded-xl peer w-full h-32 outline-none focus:border-blue-500 pl-10 pt-2"
                                        />
                                        <TextIcon className="peer-focus:text-blue-500 top-0 translate-y-[12px] translate-x-2 absolute w-[1.2rem] h-[1.2rem] transition-all duration-100" />
                                    </div>
                                )
                                :
                                <span className="text-slate-700">{userForm.bio.value ? userForm.bio.value : (<span className="text-red-500"> No Bio added </span>)}</span>
                            }
                        </div>
                    </div>
                    <div className="flex sm:justify-end px-4">
                        <button
                            type='submit'
                            className="max-sm:w-full whitespace-nowrap px-4 py-2 w-fit h-fit text-white bg-blue-600 rounded-lg hover:bg-blue-700/90 active:bg-blue-700 transition-all duration-150 mt-4"
                        >
                            Save Changes
                        </button>
                    </div>
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
                <p className={`gap-2 flex items-center font-medium ${percentages.location === 10 ? "text-slate-900" : "text-gray-400"}`}>
                    {
                        percentages.location === 10 ? <CheckIcon className="" /> : <XIcon className="" />
                    }
                    <span>Location</span>
                    <span className={`${percentages.location === 10 ? "text-gray-400" : "text-green-500"} font-semibold`}>{!(percentages.location === 10) ? "+" : ""}10%</span>
                </p>
                <p className={`gap-2 flex items-center font-medium ${percentages.bio === 20 ? "text-slate-900" : "text-gray-400"}`}>
                    {
                        percentages.bio === 20 ? <CheckIcon className="" /> : <XIcon className="" />
                    }
                    <span>Biogarphy</span>
                    <span className={`${percentages.bio === 20 ? "text-gray-400" : "text-green-500"} font-semibold`}>{!(percentages.bio === 20) ? "+" : ""}20%</span>
                </p>
            </div>
            </div>
        </form>
    )
}

export default EditMentorProfile