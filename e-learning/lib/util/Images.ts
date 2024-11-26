
import fs from "fs";
import path from "path";
import { supabase } from "./supabaseClient";

function base64ToImageFile(base64String: string, fileName: string) {
  const byteArray = Uint8Array.from(atob(base64String.split(',')[1]), char => char.charCodeAt(0));
  const blob = new Blob([byteArray], { type: 'image/png' });
  return new File([blob], fileName || 'image.png', { type: 'image/png' });
}

export async function deleteImageByPath(imagePath: string): Promise<boolean> {
  const bucket = "elearningbucket"
  try {        
    const { data, error } = await supabase.storage.from(bucket).remove([imagePath])
    if (error) {
        console.error(`Error deleting ${imagePath}: `, error)
        return false
    } else {
        console.log(`Successfully deleted ${imagePath}`);
        return true
    }
  } catch (error) {
      console.error(`Error in deleting ${imagePath}: `, error)
      return false
  }
}


export async function saveBase64Image(base64Image: string, courseName: string): Promise<string | undefined> {
    try {
      const bucket = "elearningbucket"
      const sanitizedCourseName = `${courseName
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "_")}` + Date.now()
      const image = base64ToImageFile(base64Image, sanitizedCourseName)
      const {data, error} = await supabase.storage.from(bucket).upload(`/Images/${sanitizedCourseName}`, image)
      console.log(error)
        if(error) {
          alert('Error uploading file.');
          return undefined
        }
      return `/Images/${sanitizedCourseName}`
    } catch (error) {
      console.error('Failed to process image:', error);
      return undefined;
    }
}

export async function getImageByPath(imagePath: string): Promise<string | undefined> {
  try {
    const {data, error} = await supabase.storage.from("elearningbucket").download(imagePath)

    if (error) {
        console.error(error);
        return undefined
    }

    const imageBuffer = await data?.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString("base64");
    return `data:image/png;base64,${base64Image}`;

  } catch (error) {
    console.error('Failed to retrieve image:', error);
    return undefined;
  }
}