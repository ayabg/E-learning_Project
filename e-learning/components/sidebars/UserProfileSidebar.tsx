import React from 'react'
import DashSidebar from './Dashsidebar'
import DashSidebarItem from './DashsidebarItem'
import { BookCopyIcon, CaptionsIcon, ChartBarBig, LibraryBigIcon, UserCircle } from 'lucide-react'

function UserProfileSidebar() {
  return (
    <DashSidebar>
        <p className="text-sm text-gray-400"> Me </p>
        <DashSidebarItem icon={<UserCircle />} text={"Profile"} alert={false} route="/user-profile" />
        <p className="text-sm text-gray-400 mt-2"> Course </p>
        <DashSidebarItem icon={<LibraryBigIcon />} text={"Courses"} alert={false} route="/user-profile/courses" />
    </DashSidebar>
  )
}

export default UserProfileSidebar