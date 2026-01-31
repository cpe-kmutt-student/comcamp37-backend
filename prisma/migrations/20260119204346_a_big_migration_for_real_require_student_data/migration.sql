/*
  Warnings:

  - You are about to drop the column `std_info_alternative_email` on the `StudentInfo` table. All the data in the column will be lost.
  - You are about to drop the column `std_info_food_prefer` on the `StudentInfo` table. All the data in the column will be lost.
  - You are about to drop the column `std_info_gender` on the `StudentInfo` table. All the data in the column will be lost.
  - You are about to drop the column `std_info_home_phone` on the `StudentInfo` table. All the data in the column will be lost.
  - You are about to drop the column `std_info_parent_name` on the `StudentInfo` table. All the data in the column will be lost.
  - You are about to drop the column `std_info_parent_phone` on the `StudentInfo` table. All the data in the column will be lost.
  - You are about to drop the column `std_info_phone` on the `StudentInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "StudentFiles" ADD COLUMN     "std_file_slip" TEXT;

-- AlterTable
ALTER TABLE "StudentInfo" DROP COLUMN "std_info_alternative_email",
DROP COLUMN "std_info_food_prefer",
DROP COLUMN "std_info_gender",
DROP COLUMN "std_info_home_phone",
DROP COLUMN "std_info_parent_name",
DROP COLUMN "std_info_parent_phone",
DROP COLUMN "std_info_phone",
ADD COLUMN     "std_birthdate" TEXT,
ADD COLUMN     "std_info_education_institute" TEXT,
ADD COLUMN     "std_info_have_mouse" BOOLEAN,
ADD COLUMN     "std_info_have_tablet" BOOLEAN,
ADD COLUMN     "std_info_laptop_os" TEXT,
ADD COLUMN     "std_info_parent_fullname" TEXT,
ADD COLUMN     "std_info_parent_phone_number" TEXT,
ADD COLUMN     "std_info_phone_number" TEXT,
ADD COLUMN     "std_user_prefix" TEXT;
