import React from 'react'
import Link from 'next/link'
import SignupForm from '@/components/auth/SignupForm'

function Signup() {
  return (
    <div className="w-full h-screen bg-cover bg-center bg-authbg fixed">
        <div className="sm:max-w-2xl mx-auto flex flex-col items-center">
            <div className="sm:max-w-2xl mx-auto flex flex-col items-center max-sm:min-w-[90%]">
                <h1 className="text-white relative mx-0 max-w-7xl mt-32 max-sm:mt-0 md:mx-auto md:px-4 md:py-2 text-balance font-medium tracking-tighter text-3xl sm:text-5xl md:text-5xl lg:text-5xl"> Create Account </h1>
                <div className="z-10 gap-2 flex flex-col p-8 sm:px-16 px-10 mt-4 h-full w-full bg-green-700/10 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-md border border-[#1f342d]/50">
                    <SignupForm />
                    <p className="text-sm mt-4"> Already have an account? <br /><Link href="/auth/sign-in" className="font-semibold underline"> Sign in. </Link> </p>
                    <div className="w-full flex gap-2 items-center justify-center">
                      <hr className="w-full h-[2px] bg-[#1f342d]/50 border-0 max-sm:bg-white" />
                      <p className="text-center max-sm:text-white"> Or </p>
                      <hr className="w-full h-[2px] bg-[#1f342d]/50 border-0 max-sm:bg-white" />
                    </div>
                    <Link href="/auth/sign-up/mentor-sign-up" className="md:font-semibold text-center hover:text-[#1f342d] transition-all duration-150 underline max-sm:text-sm max-sm:text-white max-sm:hover:text-gray-300"> Create Account as Mentor </Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signup