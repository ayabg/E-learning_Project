"use client"
import React, { useState } from 'react'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import SigninButton from '../buttons/SigninButton'

function CredentialsLoginForm() {
    const [passwdOpen, setPasswdOpen] = useState(false)
    const router = useRouter()
    return (
        <form className="flex flex-col justify-start items-start sm:w-[18rem]" action={async(formData: FormData) =>{
            try{
                const email = formData.get("email") as string
                const password = formData.get("passwd") as string
                const response = await signIn("credentials", {
                    email: email,
                    password: password,
                    redirect: false
                })
                if(response?.ok){
                    router.push("/")
                }else{
                    toast("Vérifiez les informations", {
                        description: response?.error,
                        action: {
                            label: "Réessayer",
                            onClick: () => {},
                        },
                    })
                }
            }catch(err: any){
                toast("Désolé", {
                    description: "Désolé, une erreur système est survenue.",
                    action: {
                        label: "Réessayer",
                        onClick: () => window.location.reload(),
                    },
                })
            }
        } }>
            <div className="flex items-center justify-center  z-10 w-full">
                <div className="relative w-full">
                    <input
                    id="email"
                    name="email"
                    type="text"
                    required
                    className="border-b text-white border-gray-300 py-1 focus:border-b-2 dark:focus:border-gray-200 focus:border-indigo-400 transition-colors focus:outline-none peer bg-inherit w-full placeholder-transparent"
                    placeholder=" "
                    />
                    <label
                    htmlFor="email"
                     className="text-white absolute left-0 top-1 cursor-text font-medium text-sm transition-all peer-valid:hidden peer-invalid:block peer-focus:text-xs peer-focus:-top-4 dark:peer-focus:text-gray-200 peer-focus:text-indigo-400"
                    >Email Address</label
                    >
                </div>
            </div>
            <div className="flex items-center justify-center mt-5 z-10 w-full">
                <div className="relative w-full">
                    <input
                    id="passwd"
                    name="passwd"
                    type={`${passwdOpen ? "text" : "password"}`}
                    className="border-b peer text-white border-gray-300 py-1 focus:border-b-2 dark:focus:border-gray-200 focus:border-indigo-400 transition-colors focus:outline-none peer bg-inherit w-full placeholder-transparent"
                    required
                    placeholder=" "
                    />
                    <label
                    htmlFor="passwd"
                    className="text-white absolute peer-focus:text-indigo-400 left-0 top-1 cursor-text font-medium text-sm transition-all peer-valid:hidden peer-invalid:block peer-focus:text-xs peer-focus:-top-4 dark:peer-focus:text-gray-200"
                    > Password </label>
                </div>
                {
                    passwdOpen ?
                        <EyeOffIcon onClick={()=>setPasswdOpen(!passwdOpen)} className="absolute right-16 -translate-x- cursor-pointer" />
                    :
                        <EyeIcon onClick={()=>setPasswdOpen(!passwdOpen)} className="absolute right-16 -translate-x- cursor-pointer" />
                }
            </div>
            <SigninButton />
        </form>
    )
}

export default CredentialsLoginForm