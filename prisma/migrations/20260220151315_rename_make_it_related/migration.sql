/*
  Warnings:

  - The primary key for the `ApplicationAcademicChaosQuestionAnswer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `std_academic_answer` on the `ApplicationAcademicChaosQuestionAnswer` table. All the data in the column will be lost.
  - You are about to drop the column `std_academic_answer_id` on the `ApplicationAcademicChaosQuestionAnswer` table. All the data in the column will be lost.
  - You are about to drop the column `std_academic_answer_section` on the `ApplicationAcademicChaosQuestionAnswer` table. All the data in the column will be lost.
  - You are about to drop the column `std_academic_answer_id` on the `ApplicationAcademicChaosQuestionScore` table. All the data in the column will be lost.
  - Added the required column `std_academic_chaos_answer` to the `ApplicationAcademicChaosQuestionAnswer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `std_academic_chaos_answer_section` to the `ApplicationAcademicChaosQuestionAnswer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `std_academic_chaos_answer_id` to the `ApplicationAcademicChaosQuestionScore` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ApplicationAcademicChaosQuestionScore" DROP CONSTRAINT "ApplicationAcademicChaosQuestionScore_std_academic_answer__fkey";

-- AlterTable
ALTER TABLE "ApplicationAcademicChaosQuestionAnswer" DROP CONSTRAINT "ApplicationAcademicChaosQuestionAnswer_pkey",
DROP COLUMN "std_academic_answer",
DROP COLUMN "std_academic_answer_id",
DROP COLUMN "std_academic_answer_section",
ADD COLUMN     "std_academic_chaos_answer" TEXT NOT NULL,
ADD COLUMN     "std_academic_chaos_answer_id" SERIAL NOT NULL,
ADD COLUMN     "std_academic_chaos_answer_section" TEXT NOT NULL,
ADD CONSTRAINT "ApplicationAcademicChaosQuestionAnswer_pkey" PRIMARY KEY ("std_academic_chaos_answer_id");

-- AlterTable
ALTER TABLE "ApplicationAcademicChaosQuestionScore" DROP COLUMN "std_academic_answer_id",
ADD COLUMN     "std_academic_chaos_answer_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ApplicationAcademicChaosQuestionScore" ADD CONSTRAINT "ApplicationAcademicChaosQuestionScore_std_academic_chaos_a_fkey" FOREIGN KEY ("std_academic_chaos_answer_id") REFERENCES "ApplicationAcademicChaosQuestionAnswer"("std_academic_chaos_answer_id") ON DELETE RESTRICT ON UPDATE CASCADE;
