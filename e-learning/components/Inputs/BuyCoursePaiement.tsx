"use client"
import React from 'react'
import  {BuyCourse} from "@/app/actions/CourseActions/BuyCourse"
import { toast } from "sonner"
import { useRouter } from 'next/navigation'
function BuyCoursePaiement({courseid, userid}: {courseid: string, userid: string}) {
    const router = useRouter()
    return (
        <form action={
            async(formdata: FormData) => {
                try{
                    formdata.append("courseid", courseid)
                    formdata.append("userid", userid as string)
                    const response = await BuyCourse(formdata)
                    if(response.success){
                        toast("Success", {
                            description: "You have successfully purchased this course",
                            action: {
                                label: "Close",
                                onClick: () => {}
                            }
                        })
                        router.push(`/courses/course?id=${courseid}`)
                    }
                    else{
                        toast("Sorry", {
                            description: response.error,
                            action: {
                                label: "Retry",
                                onClick: () => {}
                            }
                        })
                    }
                }catch(err: any){
                    toast("Sorry", {
                        description: "An error occurred while processing your payment",
                        action: {
                            label: "Retry",
                            onClick: () => {}
                        }
                    })
                }
            }
        } className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8">
        <div className="mb-6 grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
            <label htmlFor="full_name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Full name (as displayed on card)* </label>
            <input type="text" id="full_name" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Eya Bouguerra" required />
            </div>

            <div className="col-span-2 sm:col-span-1">
            <label htmlFor="card-number-input" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"> Card number* </label>
            <input type="text" id="card-number-input" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="xxxx-xxxx-xxxx-xxxx" required />
            </div>

            <div>
            <label htmlFor="card-expiration-input" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Card expiration* </label>
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path
                    fill-rule="evenodd"
                    d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                    clip-rule="evenodd"
                    />
                </svg>
                </div>
                <input datepicker-htmlFormat="mm/yy" id="card-expiration-input" type="text" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-9 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" required />
            </div>
            </div>
            <div>
            <label htmlFor="cvv-input" className="mb-2 flex items-center gap-1 text-sm font-medium text-gray-900 dark:text-white">
                CVV*
                <button data-tooltip-target="cvv-desc" data-tooltip-trigger="hover" className="text-gray-400 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white">
                <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z" clip-rule="evenodd" />
                </svg>
                </button>
                <div id="cvv-desc" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                The last 3 digits on back of card
                <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
            </label>
            <input type="number" id="cvv-input" aria-describedby="helper-text-explanation" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="•••" required />
            </div>
        </div>
        <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-4 transition-all duration-150 focus:ring-primary-300 bg-indigo-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Pay now</button>

        </form>
    )
}

export default BuyCoursePaiement