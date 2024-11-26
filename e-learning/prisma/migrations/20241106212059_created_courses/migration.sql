-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "creatorID" TEXT NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_creatorID_fkey" FOREIGN KEY ("creatorID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
