"use client"
import { useContext } from "react";
import { SidebarContext } from "./Dashsidebar";
import { usePathname, useRouter } from "next/navigation";
export default function DashSidebarItem({icon, text, alert, route}:{icon: any, text: any, alert: any, route: string} ){
    const {expanded} = useContext(SidebarContext)
    const pathname = usePathname()
    const router = useRouter()
    return(
        <li onClick={()=>router.push(route)} className={`
            z-10
            text-black relative flex items-center py-2 px-3 my-1
            font-medium rounded-md cursor-pointer transition-colors group whitespace-nowrap
            ${route === pathname ? "bg-gradient-to-r from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-indigo-50 text-gray-600 dark:hover:bg-indigo-950 dark:text-gray-400"}
        `}>
            {icon}
            <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}> {text} </span>
            {alert && <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`} />}
            {
                !expanded &&
                <div className={`
                    absolute left-full rounded-md px-2 py-1 ml-6
                    bg-indigo-100 text-indigo-800 text-sm
                    invisible opacity-20 -translate-x-3 transition-all
                    whitespace-nowrap
                    group-hover:visible group-hover:opacity-100
                    group-hover:translate-x-0
                `}>
                    {text}
                </div>
                
            }
        </li>
    )
}