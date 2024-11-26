-- CreateTable
CREATE TABLE "answeredQuiz" (
    "id" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "quizID" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "answeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "answeredQuiz_id_key" ON "answeredQuiz"("id");

-- CreateIndex
CREATE UNIQUE INDEX "answeredQuiz_quizID_key" ON "answeredQuiz"("quizID");

-- AddForeignKey
ALTER TABLE "answeredQuiz" ADD CONSTRAINT "answeredQuiz_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "answeredQuiz" ADD CONSTRAINT "answeredQuiz_quizID_fkey" FOREIGN KEY ("quizID") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
