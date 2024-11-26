-- CreateTable
CREATE TABLE "SubscribedCourses" (
    "id" TEXT NOT NULL,
    "courseid" TEXT NOT NULL,
    "userid" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "SubscribedCourses_id_key" ON "SubscribedCourses"("id");

-- AddForeignKey
ALTER TABLE "SubscribedCourses" ADD CONSTRAINT "SubscribedCourses_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscribedCourses" ADD CONSTRAINT "SubscribedCourses_courseid_fkey" FOREIGN KEY ("courseid") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
