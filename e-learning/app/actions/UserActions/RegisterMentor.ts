"use server"

import {hash, genSalt} from "bcryptjs"
import { revalidatePath } from "next/cache"
import prisma from "@/lib/util/db"
import { Roles } from "@prisma/client"
export const RegisterMentor = async (formData: FormData): Promise<{success: boolean, error?: string}> => {
    try {
        const email = formData.get("email") as string
        const username = formData.get("username") as string
        const job = formData.get("job") as string
        const provider = "credentials"
        const role = Roles.mentor
        console.log({email, username, job, provider, role})

        const user = await prisma.user.findUnique({
            where: { email_provider: { email, provider } }
        })
        if (user) {
            return { success: false, error: "Un utilisateur avec cet email existe déjà." }
        }

        const password = formData.get("passwd") as string
        const salt = await genSalt(10)
        const hashedPasswd = await hash(password, salt)
        const newUser = await prisma.user.create({
            data: {
                email,
                name: username,
                image: {
                    create: {
                        path: `https://ui-avatars.com/api/?name=${username[0] + username[1]}&bold=true&background=ADD8E6&color=4682B4`,
                        location: "online"
                    }
                },
                provider,
                password: hashedPasswd,
                role: role,
                job: job
            }
        })
        return { success: true }

    } catch (error: any) {
        return { success: false, error: error.message || "Une erreur système est survenue" }
    }
}
