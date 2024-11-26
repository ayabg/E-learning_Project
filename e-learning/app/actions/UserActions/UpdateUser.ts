"use server"

import AuthOptions from "@/lib/util/AuthOptions"
import prisma from "@/lib/util/db"
import { saveBase64Image } from "@/lib/util/Images"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"

export const UpdateUserPreferences = async(formdata: FormData): Promise<{success: boolean, error?: string}> => {
    const session = await  getServerSession(AuthOptions)
    try{
        const email = session?.user?.email as string
        const provider = session?.user?.provider as string
        const languages = formdata.getAll("languages") as string[]
        const categories = formdata.getAll("categories") as string[]
        const updatedUser = await prisma.user.update({
            where: {email_provider: {email, provider}},
            data: {
                preferredLanguages: languages,
                preferredCategories: categories
            }
        })
        if(!updatedUser){
            return({success: false, error: "error updating user preferences"})
        }
        return {success: true}
    }catch(err: any){
        return {success: false, error: err.message || "an error has occured"}
    }
}

export const updateUserProfile = async (formdata: FormData): Promise<{ success: boolean, error?: string }> => {
    try {
        const name = formdata.get("name") || ""
        const phone = formdata.get("phone") || ""
        const bio = formdata.get("bio") || ""
        const location = formdata.get("location") || ""
        const image = formdata.get("image") as string
        const email = formdata.get("email") as string
        const provider = formdata.get("provider") as string;

        let userimagepath;
        if (image) {
            userimagepath = await saveBase64Image(image, email + provider);
        }
        console.log(userimagepath)
        // Construct data only with non-empty fields
        const updateData: Record<string, any> = {};
        if (phone) updateData.phone = phone;
        if (bio) updateData.bio = bio;
        if (location) updateData.location = location;
        if (name) updateData.name = name;
        if (userimagepath) {
            updateData.image = {
                update: {
                    path: userimagepath,
                    location: "local",
                }
            };
        }

        // Ensure updateData is not empty before making the update call
        if (Object.keys(updateData).length === 0) {
            return { success: false, error: "No valid fields to update" };
        }

        const updatedUser = await prisma.user.update({
            where: {
                email_provider: {
                    email: email,
                    provider: provider
                }
            },
            data: updateData
        });

        if (!updatedUser) {
            return { success: false, error: "Error updating user profile" };
        }

        return { success: true };
    } catch (err) {
        console.log(err);
        return { success: false, error: "An error has occurred" };
    }
};

export const updateClientProfile = async (formdata: FormData): Promise<{ success: boolean, error?: string }> => {
    try {
        const phone = formdata.get("phone") || ""
        const email = formdata.get("email") as string
        const provider = formdata.get("provider") as string;
        const image = formdata.get("image") as string
        const languages = formdata.getAll("languages") as string[]
        const categories = formdata.getAll("categories") as string[]
        let userimagepath;
        if (image) {
            userimagepath = await saveBase64Image(image, email + provider);
        }
        // Construct data only with non-empty fields
        const updateData: Record<string, any> = {};
        if (phone) updateData.phone = phone;
        updateData.preferredLanguages = languages
        updateData.preferredCategories = categories
        if (userimagepath) {
            updateData.image = {
                update: {
                    path: userimagepath,
                    location: "local",
                }
            };
        }

        // Ensure updateData is not empty before making the update call
        if (Object.keys(updateData).length === 0) {
            console.log(updateData)
            return { success: false, error: "No valid fields to update" };
        }

        const updatedUser = await prisma.user.update({
            where: {
                email_provider: {
                    email: email,
                    provider: provider
                }
            },
            data: updateData
        });
        console.log(updatedUser.id)
        if(!updatedUser){
            return {success: false, error: "error updating user profile"}
        }
        revalidatePath("/user-profile")
        return {success: true}
    }catch(err: any){
        console.log(err.message)
        return {success: false, error: "an error has occured"}
    }
}