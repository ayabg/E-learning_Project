/*
  Warnings:

  - Added the required column `difficulty` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "difficulty" TEXT NOT NULL;
