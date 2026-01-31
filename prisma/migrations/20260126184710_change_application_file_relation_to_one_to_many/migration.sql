/*
  Warnings:

  - The primary key for the `ApplicationFile` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `std_file_id` on the `ApplicationFile` table. All the data in the column will be lost.
  - Added the required column `std_file_size` to the `ApplicationFile` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "ApplicationFile_std_file_id_key";

-- DropIndex
DROP INDEX "ApplicationFile_std_file_key_key";

-- AlterTable
ALTER TABLE "ApplicationFile" DROP CONSTRAINT "ApplicationFile_pkey",
DROP COLUMN "std_file_id",
ADD COLUMN     "std_file_size" TEXT NOT NULL,
ADD CONSTRAINT "ApplicationFile_pkey" PRIMARY KEY ("std_file_key");
