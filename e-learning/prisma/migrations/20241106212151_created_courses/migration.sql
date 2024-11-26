-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_creatorID_fkey";

-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "creatorID" DROP NOT NULL,
ALTER COLUMN "creatorID" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_creatorID_fkey" FOREIGN KEY ("creatorID") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
