"use server"
import EditMentorProfile from '@/components/pages/EditMentorProfile'
import MentorProfileSidebar from '@/components/sidebars/MentorProfileSidebar'
import AuthOptions from '@/lib/util/AuthOptions'
import prisma from '@/lib/util/db'
import { Image, User } from '@prisma/client'
import { getServerSession } from 'next-auth'

async function MentorProfile() {
  const session = await getServerSession(AuthOptions)
  const userdetails = await prisma.user.findUnique({where: {email_provider: {email: session?.user?.email as string, provider: session?.user?.provider as string}}, include: {image: true}}) as User & {image: Image}
  if(!userdetails) return null
  return (
    <div className="w-full mb-6 flex">
        <MentorProfileSidebar />
        <div className="w-full h-full max-md:p-2 p-12 bg-[#C0C0C0]/15">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 max-md:text-lg md:pl-8">
            Edit Profile
          </h1>
          <EditMentorProfile user={userdetails} />
        </div>
    </div>
  )
}

export default MentorProfile