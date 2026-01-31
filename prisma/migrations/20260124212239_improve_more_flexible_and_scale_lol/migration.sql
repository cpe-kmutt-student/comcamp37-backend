/*
  Warnings:

  - The primary key for the `StudentInfo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `std_user_id` on the `StudentInfo` table. All the data in the column will be lost.
  - You are about to drop the `StudentFiles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentQuestions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentStatus` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `std_application_id` to the `StudentInfo` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('file_face', 'file_national_id', 'file_parent_permission', 'file_pp_1', 'file_pp_7', 'file_slip');

-- DropForeignKey
ALTER TABLE "StudentFiles" DROP CONSTRAINT "StudentFiles_std_user_id_fkey";

-- DropForeignKey
ALTER TABLE "StudentInfo" DROP CONSTRAINT "StudentInfo_std_user_id_fkey";

-- DropForeignKey
ALTER TABLE "StudentQuestions" DROP CONSTRAINT "StudentQuestions_std_user_id_fkey";

-- DropForeignKey
ALTER TABLE "StudentStatus" DROP CONSTRAINT "StudentStatus_std_user_id_fkey";

-- AlterTable
ALTER TABLE "StudentInfo" DROP CONSTRAINT "StudentInfo_pkey",
DROP COLUMN "std_user_id",
ADD COLUMN     "std_application_id" TEXT NOT NULL,
ADD COLUMN     "stf_std_info_note" TEXT,
ADD CONSTRAINT "StudentInfo_pkey" PRIMARY KEY ("std_application_id");

-- DropTable
DROP TABLE "StudentFiles";

-- DropTable
DROP TABLE "StudentQuestions";

-- DropTable
DROP TABLE "StudentStatus";

-- CreateTable
CREATE TABLE "StudentFile" (
    "std_application_id" TEXT NOT NULL,
    "std_file_id" SERIAL NOT NULL,
    "std_file_originalname" TEXT NOT NULL,
    "std_file_mimetype" TEXT NOT NULL,
    "std_file_encoding" TEXT NOT NULL,
    "std_file_key" TEXT NOT NULL,
    "std_file_type" "FileType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentFile_pkey" PRIMARY KEY ("std_application_id")
);

-- CreateTable
CREATE TABLE "StaffRegisQuestionScore" (
    "id" SERIAL NOT NULL,
    "std_regis_answer_id" INTEGER NOT NULL,
    "stf_count" INTEGER NOT NULL,
    "stf_score" DOUBLE PRECISION NOT NULL,
    "stf_user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StaffRegisQuestionScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentRegisQuestionAnswer" (
    "std_application_id" TEXT NOT NULL,
    "std_regis_answer_id" SERIAL NOT NULL,
    "std_regis_answer_section" TEXT NOT NULL,
    "std_regis_answer" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentRegisQuestionAnswer_pkey" PRIMARY KEY ("std_regis_answer_id")
);

-- CreateTable
CREATE TABLE "StaffAcademicQuestionScore" (
    "id" SERIAL NOT NULL,
    "std_academic_answer_id" INTEGER NOT NULL,
    "stf_count" INTEGER NOT NULL,
    "stf_score" DOUBLE PRECISION NOT NULL,
    "stf_user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StaffAcademicQuestionScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentAcademicQuestionAnswer" (
    "std_application_id" TEXT NOT NULL,
    "std_academic_answer_id" SERIAL NOT NULL,
    "std_academic_answer_section" TEXT NOT NULL,
    "std_academic_answer" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentAcademicQuestionAnswer_pkey" PRIMARY KEY ("std_academic_answer_id")
);

-- CreateTable
CREATE TABLE "ApplicationStatus" (
    "std_application_id" TEXT NOT NULL,
    "std_status_info_done" BOOLEAN DEFAULT false,
    "std_status_file_done" BOOLEAN DEFAULT false,
    "std_status_regis_question_done" BOOLEAN DEFAULT false,
    "std_status_acdemic_question_done" BOOLEAN DEFAULT false,
    "std_status_paid" BOOLEAN DEFAULT false,
    "stf_info_checked" BOOLEAN DEFAULT false,
    "stf_q_checked" BOOLEAN DEFAULT false,
    "stf_q_result" DOUBLE PRECISION,
    "stf_q_result_detail" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApplicationStatus_pkey" PRIMARY KEY ("std_application_id")
);

-- CreateTable
CREATE TABLE "StudentApplication" (
    "std_application_id" TEXT NOT NULL,
    "std_application_submit" BOOLEAN DEFAULT false,
    "std_application_confirm" BOOLEAN DEFAULT false,
    "std_application_abort_reason" TEXT,
    "std_application_pass" BOOLEAN DEFAULT false,
    "std_user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentApplication_pkey" PRIMARY KEY ("std_application_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudentFile_std_file_id_key" ON "StudentFile"("std_file_id");

-- CreateIndex
CREATE UNIQUE INDEX "StudentFile_std_file_key_key" ON "StudentFile"("std_file_key");

-- CreateIndex
CREATE UNIQUE INDEX "StudentApplication_std_user_id_key" ON "StudentApplication"("std_user_id");

-- AddForeignKey
ALTER TABLE "StudentInfo" ADD CONSTRAINT "StudentInfo_std_application_id_fkey" FOREIGN KEY ("std_application_id") REFERENCES "StudentApplication"("std_application_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentFile" ADD CONSTRAINT "StudentFile_std_application_id_fkey" FOREIGN KEY ("std_application_id") REFERENCES "StudentApplication"("std_application_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffRegisQuestionScore" ADD CONSTRAINT "StaffRegisQuestionScore_std_regis_answer_id_fkey" FOREIGN KEY ("std_regis_answer_id") REFERENCES "StudentRegisQuestionAnswer"("std_regis_answer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffRegisQuestionScore" ADD CONSTRAINT "StaffRegisQuestionScore_stf_user_id_fkey" FOREIGN KEY ("stf_user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentRegisQuestionAnswer" ADD CONSTRAINT "StudentRegisQuestionAnswer_std_application_id_fkey" FOREIGN KEY ("std_application_id") REFERENCES "StudentApplication"("std_application_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffAcademicQuestionScore" ADD CONSTRAINT "StaffAcademicQuestionScore_std_academic_answer_id_fkey" FOREIGN KEY ("std_academic_answer_id") REFERENCES "StudentAcademicQuestionAnswer"("std_academic_answer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffAcademicQuestionScore" ADD CONSTRAINT "StaffAcademicQuestionScore_stf_user_id_fkey" FOREIGN KEY ("stf_user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentAcademicQuestionAnswer" ADD CONSTRAINT "StudentAcademicQuestionAnswer_std_application_id_fkey" FOREIGN KEY ("std_application_id") REFERENCES "StudentApplication"("std_application_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationStatus" ADD CONSTRAINT "ApplicationStatus_std_application_id_fkey" FOREIGN KEY ("std_application_id") REFERENCES "StudentApplication"("std_application_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentApplication" ADD CONSTRAINT "StudentApplication_std_user_id_fkey" FOREIGN KEY ("std_user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
