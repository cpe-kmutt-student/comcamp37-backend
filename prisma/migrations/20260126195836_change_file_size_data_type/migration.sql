/*
  Warnings:

  - The `std_file_size` column on the `ApplicationFile` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ApplicationFile" DROP COLUMN "std_file_size",
ADD COLUMN     "std_file_size" BIGINT;
