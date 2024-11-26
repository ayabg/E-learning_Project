"use client"
import axios from 'axios'
import { ThumbsDownIcon, ThumbsUpIcon, XIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React, { useLayoutEffect, useState } from 'react'
import { toast } from 'sonner'

function AssesmentAlertCard({id}: {id: string}) {
    const session = useSession()
    const [open, setOpen] = useState(false)
    if(!session) return null
    const [assessmentdetails, setAssesssment] = useState<string>("")
    const fetchModelAssement = async()=> {
        const response = await axios.post("/api/user/getModelAssessment", {
            userid: id
        })
        const {assessment} = response.data
        setOpen(true)
        setAssesssment(assessment)
    }
    useLayoutEffect(()=>{
        fetchModelAssement()
    }, []) 
    const evaluateModel = async(Eval: number) => {
        try{
            const response = await axios.post("/api/courses/EvaluateQuizModel", {
                evaluation: Eval
            })
            console.log(response.data)
            if(response?.data?.success === true){
                toast("Model Evaluated", {
                    description: "The model has been evaluated successfully",
                    action: {
                        label: "Close",
                        onClick: () => {}
                    }  
                })
            }else{
                toast("Failed to submit Evaluation", {
                    description: "couldn't evaluate the model",
                    action: {
                        label: "Retry",
                        onClick: () => {}
                    }
                })
            }
        }catch(err){
            toast("Failed to evaluate quiz", {
                description: "An internal error has occured please try again",
                action: {
                    label: "Retry",
                    onClick: () => {}
                }  
            })
        }
        setOpen(false)
    }
    return (
        <>
            {
                open &&
                <div className="bg-teal-100 border-t-4 z-40 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md absolute top-0" role="alert">
                    <div className="flex">
                        <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                        <div>
                        <div className="w-full flex justify-between items-center">
                            <p className="font-bold"> An assessment based on your profile </p>
                            <XIcon onClick={()=>setOpen(false)} className="w-5 h-5 cursor-pointer hover:text-teal-600 active:text-teal-500/80"/>
                        </div>
                        <p className="text-sm max-w-96">{assessmentdetails}</p>
                        </div>
                    </div>
                    <div className="w-full justify-end items-center gap-2 flex mt-2">
                        <ThumbsUpIcon onClick={()=>evaluateModel(1)} className="w-5 h-5 cursor-pointer hover:text-teal-600 active:text-teal-500/80 active:-translate-y-px transition-all duration-150"/>
                        <ThumbsDownIcon onClick={()=>evaluateModel(-1)} className="w-5 h-5 cursor-pointer hover:text-teal-600 active:text-teal-500/80 active:translate-y-px transition-all duration-150"/>
                    </div>
                </div>
            }
        </>
    )
}

export default AssesmentAlertCard