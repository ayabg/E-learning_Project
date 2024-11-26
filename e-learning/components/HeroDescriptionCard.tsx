import React from 'react'
import {CheckIcon} from "lucide-react"
function HeroDescriptionCard() {
  return (
    <div className="flex p-2 shadow-lg rounded-lg border-2 bg-white gap-3">
        <div className="bg-violet-500 rounded-md w-fit h-fit p-2 text-white">
            <CheckIcon />
        </div>
        <div className="flex flex-col break-words gap-1">
            <h1 className="text-xs text-black font-semibold">1-on-1 lessons in more than 150 languages</h1>
            <p className="text-xs text-gray-500 font-thin">Learn from certified teachers with proven experience</p>
        </div>
    </div>
  )
}

export default HeroDescriptionCard