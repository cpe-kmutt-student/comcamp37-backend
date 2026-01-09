/*
  Warnings:

  - You are about to drop the column `std_q_result_detail` on the `StudentStatus` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "StudentStatus" DROP COLUMN "std_q_result_detail",
ADD COLUMN     "stf_q_result_detail" TEXT;
