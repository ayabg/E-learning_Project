/*
  Warnings:

  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ImageLocation" AS ENUM ('local', 'online');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "image";

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL DEFAULT '',
    "userID" TEXT,
    "courseID" TEXT,
    "location" "ImageLocation" NOT NULL DEFAULT 'online',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "language" TEXT NOT NULL,
    "description" VARCHAR(500) NOT NULL,
    "category" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Lesson" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "courseID" TEXT
);

-- CreateTable
CREATE TABLE "Chapter" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "lessonID" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Image_id_key" ON "Image"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Image_userID_key" ON "Image"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "Image_courseID_key" ON "Image"("courseID");

-- CreateIndex
CREATE UNIQUE INDEX "Course_id_key" ON "Course"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Lesson_id_key" ON "Lesson"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Chapter_id_key" ON "Chapter"("id");

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_courseID_fkey" FOREIGN KEY ("courseID") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_courseID_fkey" FOREIGN KEY ("courseID") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_lessonID_fkey" FOREIGN KEY ("lessonID") REFERENCES "Lesson"("id") ON DELETE SET NULL ON UPDATE CASCADE;
