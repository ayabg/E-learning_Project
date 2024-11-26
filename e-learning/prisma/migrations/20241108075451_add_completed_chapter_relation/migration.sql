/*
  Warnings:

  - Added the required column `answeredquizID` to the `AnsweredQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AnsweredQuestion" ADD COLUMN     "answeredquizID" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "AnsweredQuestion" ADD CONSTRAINT "AnsweredQuestion_answeredquizID_fkey" FOREIGN KEY ("answeredquizID") REFERENCES "answeredQuiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
