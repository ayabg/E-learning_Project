"use client"
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { isValidEmail } from '@/lib/util/String'
import { Register } from '@/app/actions/UserActions/Register'
import SignupButton from '../buttons/SignupButton'

const verifyForm = (formData: FormData) => {
    if (formData.get("passwd") !== formData.get("confirmpasswd")) {
        throw new Error("Les mots de passe doivent être identiques.");
    }
    if (!isValidEmail(formData.get("email") as string)) {
        throw new Error("L'adresse e-mail est invalide.");
    }
    if ((formData.get("username") as string).length < 3) {
        throw new Error("Le nom d'utilisateur est trop court, au moins 4 caractères.");
    }
    if ((formData.get("passwd") as string).length < 5) {
        throw new Error("Le mot de passe est trop court, au moins 5 caractères.");
    }
};


function SignupForm() {
    const [confirmpasswdOpen, setConfirmPasswdOpen] = useState(false)
    const [passwdOpen, setPasswdOpen] = useState(false)
    const router = useRouter()
    return (
        <form className="flex flex-col justify-start items-start sm:w-[18rem]" action={async(formData: FormData) =>{
            try{
                verifyForm(formData)
                const result = await Register(formData);
                if(result?.success === false){
                    toast("Désolé", {
                        description: result?.error || "Une erreur est survenue.",
                        action: {
                            label: "Réessayer",
                            onClick: () => {},
                        },
                    });
                }
                if(result?.success){
                    const response = await signIn("credentials", {
                        email: formData.get("email") as string,
                        password: formData.get("passwd") as string,
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
                }
            }catch(err: any){
                const errorMessage = err?.message
                    ? err?.message
                    : "Désolé, une erreur système est survenue.";

                toast(err?.message ? "Vérifiez les informations" : "Désolé", {
                    description: errorMessage,
                    action: {
                        label: "Réessayer",
                        onClick: () => {},
                    },
                });
            }
        }}
        >
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
            <div className="flex items-center justify-center  z-10 w-full mt-5">
                <div className="relative w-full">
                    <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    className="border-b text-white border-gray-300 py-1 focus:border-b-2 dark:focus:border-gray-200 focus:border-indigo-400 transition-colors focus:outline-none peer bg-inherit w-full placeholder-transparent"
                    placeholder=" "
                    />
                    <label
                    htmlFor="email"
                     className="text-white absolute left-0 top-1 cursor-text font-medium text-sm transition-all peer-valid:hidden peer-invalid:block peer-focus:text-xs peer-focus:-top-4 dark:peer-focus:text-gray-200 peer-focus:text-indigo-400"
                    >Full Name</label
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
            <div className="flex items-center justify-center mt-5 z-10 w-full">
                <div className="relative w-full">
                    <input
                    id="confirmpasswd"
                    name="confirmpasswd"
                    type={`${confirmpasswdOpen ? "text" : "password"}`}
                    className="border-b text-white peer border-gray-300 py-1 focus:border-b-2 dark:focus:border-gray-200 focus:border-indigo-400 transition-colors focus:outline-none peer bg-inherit w-full placeholder-transparent"
                    required
                    placeholder=" "
                    />
                    <label
                    htmlFor="confirmpasswd"
                    className="text-white absolute peer-focus:text-indigo-400 left-0 top-1 cursor-text font-medium text-sm transition-all peer-valid:hidden peer-invalid:block peer-focus:text-xs peer-focus:-top-4 dark:peer-focus:text-gray-200"
                    > Connfirm Password </label>
                </div>
                {
                    confirmpasswdOpen ?
                        <EyeOffIcon onClick={()=>setConfirmPasswdOpen(!confirmpasswdOpen)} className="absolute right-16 -translate-x- cursor-pointer" />
                    :
                        <EyeIcon onClick={()=>setConfirmPasswdOpen(!confirmpasswdOpen)} className="absolute right-16 -translate-x- cursor-pointer" />
                }
            </div>
            <SignupButton />
        </form>
    )
}

export default SignupForm