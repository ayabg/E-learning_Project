-- CreateTable
CREATE TABLE "CompletedChapter" (
    "id" TEXT NOT NULL,
    "subscribedCourseID" TEXT NOT NULL,
    "chapterID" TEXT NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "score" DOUBLE PRECISION
);

-- CreateIndex
CREATE UNIQUE INDEX "CompletedChapter_id_key" ON "CompletedChapter"("id");

-- AddForeignKey
ALTER TABLE "CompletedChapter" ADD CONSTRAINT "CompletedChapter_subscribedCourseID_fkey" FOREIGN KEY ("subscribedCourseID") REFERENCES "SubscribedCourses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompletedChapter" ADD CONSTRAINT "CompletedChapter_chapterID_fkey" FOREIGN KEY ("chapterID") REFERENCES "Chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
