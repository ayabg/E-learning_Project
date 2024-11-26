
import AuthOptions from "@/lib/util/AuthOptions"
import prisma from "@/lib/util/db"
import { getParams } from "@/lib/util/params"
import { getServerSession } from "next-auth"
import { headers } from "next/headers"

import BuyCoursePaiement from "@/components/Inputs/BuyCoursePaiement"

export async function Paiement() {
    const headerlist = headers()
    const pathname = headerlist.get("x-current-path")
    const params: URLSearchParams = getParams(pathname)
    const courseid = params.get("courseid") as string
    const coursePrice = params.get("price") as string

    const session = await getServerSession(AuthOptions)    
    const user = await prisma.user.findUnique({where: {email_provider: {email: session?.user?.email as string, provider: session?.user?.provider as string}}})
  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-12">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <div className="mx-auto max-w-5xl">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Payment</h2>

            <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
                <BuyCoursePaiement courseid={courseid} userid={user?.id as string} />

                <div className="mt-6 grow sm:mt-8 lg:mt-0">
                <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
                    <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400"> Course Price </dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white"> {parseFloat(coursePrice).toFixed(2)} TND </dd>
                    </dl>

                    

                    <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                        <dd className="text-base font-medium text-gray-900 dark:text-white"> {177 * 0.19} TND </dd>
                    </dl>
                    </div>
                    
                    <dl className="flex items- justify- gap-4 border-t flex-col border-gray-200 pt-2 dark:border-gray-700">
                    <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                        <dd className="text-base font-medium text-green-500">-99.00 TND</dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400"> Offer ends at </dt>
                        <dd className="text-base font-medium text-red-600 dark:text-white"> 12/7/2024 </dd>
                    </dl>
                    </dl>

                    <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">100.00 TND</dd>
                    </dl>
                </div>

                <div className="mt-6 flex items-center justify-center gap-8">
                    <img className="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg" alt="" />
                    <img className="hidden h-8 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg" alt="" />
                    <img className="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg" alt="" />
                    <img className="hidden h-8 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg" alt="" />
                    <img className="h-8 w-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg" alt="" />
                    <img className="hidden h-8 w-auto dark:flex" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg" alt="" />
                </div>
                </div>
            </div>

            <p className="mt-6 text-center w-full flex justify-center items-center gap-1 text-gray-500 dark:text-gray-400 sm:mt-8 lg:text-left">
                Payment processed by <a href="#" title="" className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">Konnect</a>{" "} for {" "}<a href="#" title="" className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"> NextGEN Learning </a>
                - Tunisia
            </p>
            </div>
        </div>
        </section>
  )
}

export default Paiement