"use client"
import { FacebookIcon } from "lucide-react"
import { signIn } from "next-auth/react"

import React from 'react'

function FacebookButton() {
  return (
    <button onClick={async()=>await signIn("facebook", {
        callbackUrl: `${window.location.origin}`
    })} className="whitespace-nowrap max-sm:text-sm bg-blue-800/80 rounded-lg text-white font-medium border-gray-400 py-2 justify-center px-5 flex gap-2 items-center hover:bg-blue-900 transition duration-150">
        <FacebookIcon stroke="0" fill="white" />
        Continuer avec Facebook
    </button>
  )
}

export default FacebookButton