"use client";
import React from "react";
import { useDropzone } from "react-dropzone";
import { ImagePlus, ImageUpIcon } from "lucide-react";
import { UpdateCourseDetail } from "@/types/types";

interface ImageUploaderProps {
  preview: string | ArrayBuffer | null
  setPreview: UpdateCourseDetail
}

const CourseThumbnailDragAndDrop: React.FC<ImageUploaderProps> = ({ preview, setPreview }) => {
  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const reader = new FileReader();
      try {
        reader.onload = () => setPreview("image", reader.result);
        reader.readAsDataURL(acceptedFiles[0]);
      } catch (error) {
        setPreview("image", null);
      }
    },
    [setPreview],
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      maxFiles: 1,
      maxSize: 1000000,
      accept: { "image/png": [], "image/jpg": [], "image/jpeg": [] },
    });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className="flex lg:h-[25rem] cursor-pointer flex-col items-center justify-center rounded-xl shadow-sm border"
      >
        {preview && (
          <img
            src={preview as string}
            alt="Uploaded image"
            className="w-full h-full object-cover rounded-3xl"
          />
        )}
        {
          !preview && (
            <>
            <div className="flex flex-col items-center justify-center gap-2">
              <ImageUpIcon className="size-20 text-gray-500" />
              <p className="text-sm text-gray-500">Click or Drag and drop an image here</p>
              <p className="text-sm text-gray-500"> Image should be of type <span> JPG, JPEG, PNG </span> </p>
            </div>
            </>
          )
        }
        <input {...getInputProps()} type="file" />
      </div>

      {fileRejections.length !== 0 && (
        <p className="text-red-600">
          Image must be less than 1MB and of type png, jpg, or jpeg.
        </p>
      )}
    </div>
  );
};

export default CourseThumbnailDragAndDrop;
