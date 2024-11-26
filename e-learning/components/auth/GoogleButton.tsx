"use client"
import { signIn } from "next-auth/react"
import googleIcon from "../../components/Images/Icons/GoogleIcon.svg"
import Image from "next/image"
import React from 'react'

function GoogleButton() {
  return (
    <button onClick={async()=>await signIn("google", {
        callbackUrl: `${window.location.origin}`
    })} className="whitespace-nowrap max-sm:text-sm bg-gray-800/80 rounded-lg text-white font-medium w-full justify-center border-gray-400 py-2 px-5 flex gap-2 items-center hover:bg-gray-900 transition duration-150 cursor-pointer">
        <Image src={googleIcon} alt="" className="w-5 h-5" />
        Continuer avec Google
    </button>
  )
}

export default GoogleButton