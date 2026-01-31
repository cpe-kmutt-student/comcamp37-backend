/*
  Warnings:

  - The `std_info_gender` column on the `ApplicationInfo` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "AppInfoGender" AS ENUM ('male', 'female', 'lgtv');

-- AlterTable
ALTER TABLE "ApplicationInfo" ADD COLUMN     "std_info_sexuality" TEXT,
DROP COLUMN "std_info_gender",
ADD COLUMN     "std_info_gender" "AppInfoGender";
