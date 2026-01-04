/*
  Warnings:

  - You are about to drop the column `std_user_first_name` on the `StudentUsers` table. All the data in the column will be lost.
  - You are about to drop the column `std_user_last_name` on the `StudentUsers` table. All the data in the column will be lost.
  - You are about to drop the column `std_user_nick_name` on the `StudentUsers` table. All the data in the column will be lost.
  - Added the required column `std_user_first_name` to the `StudentInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `std_user_last_name` to the `StudentInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `std_user_nick_name` to the `StudentInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StudentInfo" ADD COLUMN     "std_user_first_name" TEXT NOT NULL,
ADD COLUMN     "std_user_last_name" TEXT NOT NULL,
ADD COLUMN     "std_user_nick_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StudentUsers" DROP COLUMN "std_user_first_name",
DROP COLUMN "std_user_last_name",
DROP COLUMN "std_user_nick_name";
