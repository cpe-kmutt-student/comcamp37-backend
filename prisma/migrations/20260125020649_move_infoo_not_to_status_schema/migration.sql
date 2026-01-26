/*
  Warnings:

  - You are about to drop the column `std_status_paid` on the `ApplicationStatus` table. All the data in the column will be lost.
  - You are about to drop the column `stf_q_checked` on the `ApplicationStatus` table. All the data in the column will be lost.
  - You are about to drop the column `stf_q_result` on the `ApplicationStatus` table. All the data in the column will be lost.
  - You are about to drop the column `stf_q_result_detail` on the `ApplicationStatus` table. All the data in the column will be lost.
  - You are about to drop the column `stf_std_info_note` on the `StudentInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ApplicationStatus" DROP COLUMN "std_status_paid",
DROP COLUMN "stf_q_checked",
DROP COLUMN "stf_q_result",
DROP COLUMN "stf_q_result_detail",
ADD COLUMN     "std_info_note" TEXT,
ADD COLUMN     "std_status_payment_done" BOOLEAN DEFAULT false,
ADD COLUMN     "stf_academic_question_checked" BOOLEAN DEFAULT false,
ADD COLUMN     "stf_question_result" DOUBLE PRECISION,
ADD COLUMN     "stf_question_result_detail" TEXT,
ADD COLUMN     "stf_regis_question_checked" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "StudentInfo" DROP COLUMN "stf_std_info_note";
