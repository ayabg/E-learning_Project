-- CreateTable
CREATE TABLE "Quiz" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "lessonID" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "quizID" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "max_score" DOUBLE PRECISION NOT NULL,
    "model_score" DOUBLE PRECISION NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Quiz_id_key" ON "Quiz"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Quiz_lessonID_key" ON "Quiz"("lessonID");

-- CreateIndex
CREATE UNIQUE INDEX "Question_id_key" ON "Question"("id");

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_lessonID_fkey" FOREIGN KEY ("lessonID") REFERENCES "Lesson"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_quizID_fkey" FOREIGN KEY ("quizID") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
