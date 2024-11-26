"use client"
import { ChevronFirst, ChevronLast, LogOut } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { createContext, useState } from "react"
import Logo from "../Nav/Logo"

const initalValue = {
    expanded: true
}

export const SidebarContext = createContext(initalValue)

export default function DashSidebar({children}: {children: any}){
    const [expanded, setExpanded] = useState(false)
    return(
        <div className="max-sm:hidden">
            <nav className="h-full flex flex-col border-r border-gray-300 shadow-sm w-fit">
                <div className={`p-4 pb-2 flex ${expanded ? "justify-between" : "justify-end"} items-center`}>
                    <Logo classname={`${expanded ? "flex" : "hidden"}`} />
                    <button onClick={()=>{setExpanded(curr => !curr)}} className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-black dark:bg-gray-500 dark:hover:bg-gray-600 dark:text-white">
                        { expanded ? <ChevronFirst /> : <ChevronLast /> }
                    </button>
                </div>

                <SidebarContext.Provider value={{expanded}}>
                    <ul className="flex-1 px-3">
                        {children}
                    </ul>
                </SidebarContext.Provider>

                <div className="border-t border-gray-300 flex p-3">
                    <Image src={"https://ui-avatars.com/api/?name=na&bold=true&background=ADD8E6&color=4682B4"} height={100} width={100} alt="" className="w-10 h-10 rounded-md" />
                    <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>
                        <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-full" : "w-0"}`}>
                            <div className="leading-4">
                                <h4 className="font-semibold text-"> Mouhib Naffeti </h4>
                                <span className="text-xs text-gray-600"> mouhamednaffeti77@gmai.com </span>
                            </div>
                        </div>
                        {expanded && <LogOut onClick={() => {}} className="text-red-500 cursor-pointer hover:text-red-700 transition delay-75 duration-100" />}
                    </div>
                </div>
                {!expanded && <LogOut onClick={() => {}} className="text-red-500 cursor-pointer hover:text-red-700 transition delay-75 duration-100 ml-4 mb-2" size={28} />}
            </nav>
        </div>
    )
}