/*
  Warnings:

  - You are about to alter the column `std_file_size` on the `ApplicationFile` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "ApplicationFile" ALTER COLUMN "std_file_size" SET DATA TYPE INTEGER;
