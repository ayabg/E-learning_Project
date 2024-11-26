import React from 'react'
import DashSidebar from './Dashsidebar'
import DashSidebarItem from './DashsidebarItem'
import { BookCopyIcon, CaptionsIcon, ChartBarBig, LibraryBigIcon, UserCircle } from 'lucide-react'

function MentorProfileSidebar() {
  return (
    <DashSidebar>
        <p className="text-sm text-gray-400"> Me </p>
        <DashSidebarItem icon={<UserCircle />} text={"Profile"} alert={false} route="/mentor-profile" />
        <DashSidebarItem icon={<ChartBarBig />} text={"Statistics"} alert={false} route="/mentor-profile/stats" />
        <p className="text-sm text-gray-400 mt-2"> Course </p>
        <DashSidebarItem icon={<LibraryBigIcon />} text={"Courses"} alert={false} route="/mentor-profile/courses" />
        <DashSidebarItem icon={<BookCopyIcon /> } text={"New Course"} alert={false} route="/mentor-profile/new-course" />
        <DashSidebarItem icon={<CaptionsIcon /> } text={"Submissions"} alert={false} route="/mentor-profile/submissions" />
    </DashSidebar>
  )
}

export default MentorProfileSidebar