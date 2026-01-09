/*
  Warnings:

  - You are about to drop the column `std_q_result` on the `StudentStatus` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "StudentStatus" DROP COLUMN "std_q_result",
ADD COLUMN     "std_q_result_detail" TEXT,
ADD COLUMN     "stf_q_result" DOUBLE PRECISION;
