/*
  Warnings:

  - You are about to drop the column `model_score` on the `Question` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Question" DROP COLUMN "model_score";

-- CreateTable
CREATE TABLE "AnsweredQuestion" (
    "id" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "quizID" TEXT NOT NULL,
    "questionID" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "model_score" DOUBLE PRECISION NOT NULL,
    "answeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "AnsweredQuestion_id_key" ON "AnsweredQuestion"("id");

-- AddForeignKey
ALTER TABLE "AnsweredQuestion" ADD CONSTRAINT "AnsweredQuestion_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnsweredQuestion" ADD CONSTRAINT "AnsweredQuestion_questionID_fkey" FOREIGN KEY ("questionID") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnsweredQuestion" ADD CONSTRAINT "AnsweredQuestion_quizID_fkey" FOREIGN KEY ("quizID") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
