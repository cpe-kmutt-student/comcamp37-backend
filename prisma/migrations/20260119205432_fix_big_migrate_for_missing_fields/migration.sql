/*
  Warnings:

  - You are about to drop the column `std_birthdate` on the `StudentInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "StudentInfo" DROP COLUMN "std_birthdate",
ADD COLUMN     "std_info_birthdate" TEXT,
ADD COLUMN     "std_info_gender" TEXT;
