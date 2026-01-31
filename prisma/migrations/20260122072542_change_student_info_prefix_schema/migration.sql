/*
  Warnings:

  - You are about to drop the column `std_user_first_name` on the `StudentInfo` table. All the data in the column will be lost.
  - You are about to drop the column `std_user_last_name` on the `StudentInfo` table. All the data in the column will be lost.
  - You are about to drop the column `std_user_nick_name` on the `StudentInfo` table. All the data in the column will be lost.
  - You are about to drop the column `std_user_prefix` on the `StudentInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "StudentInfo" DROP COLUMN "std_user_first_name",
DROP COLUMN "std_user_last_name",
DROP COLUMN "std_user_nick_name",
DROP COLUMN "std_user_prefix",
ADD COLUMN     "std_info_first_name" TEXT,
ADD COLUMN     "std_info_last_name" TEXT,
ADD COLUMN     "std_info_nick_name" TEXT,
ADD COLUMN     "std_info_prefix" TEXT;
