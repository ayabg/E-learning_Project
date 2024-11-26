/*
  Warnings:

  - Added the required column `userid` to the `CompletedChapter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CompletedChapter" ADD COLUMN     "userid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "CompletedChapter" ADD CONSTRAINT "CompletedChapter_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
