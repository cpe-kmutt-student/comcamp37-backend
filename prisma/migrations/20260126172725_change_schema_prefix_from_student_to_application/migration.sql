/*
  Warnings:

  - You are about to drop the `StaffAcademicQuestionScore` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StaffRegisQuestionScore` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentAcademicQuestionAnswer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentFile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentInfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentRegisQuestionAnswer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "StaffAcademicQuestionScore" DROP CONSTRAINT "StaffAcademicQuestionScore_std_academic_answer_id_fkey";

-- DropForeignKey
ALTER TABLE "StaffAcademicQuestionScore" DROP CONSTRAINT "StaffAcademicQuestionScore_stf_user_id_fkey";

-- DropForeignKey
ALTER TABLE "StaffRegisQuestionScore" DROP CONSTRAINT "StaffRegisQuestionScore_std_regis_answer_id_fkey";

-- DropForeignKey
ALTER TABLE "StaffRegisQuestionScore" DROP CONSTRAINT "StaffRegisQuestionScore_stf_user_id_fkey";

-- DropForeignKey
ALTER TABLE "StudentAcademicQuestionAnswer" DROP CONSTRAINT "StudentAcademicQuestionAnswer_std_application_id_fkey";

-- DropForeignKey
ALTER TABLE "StudentFile" DROP CONSTRAINT "StudentFile_std_application_id_fkey";

-- DropForeignKey
ALTER TABLE "StudentInfo" DROP CONSTRAINT "StudentInfo_std_application_id_fkey";

-- DropForeignKey
ALTER TABLE "StudentRegisQuestionAnswer" DROP CONSTRAINT "StudentRegisQuestionAnswer_std_application_id_fkey";

-- DropTable
DROP TABLE "StaffAcademicQuestionScore";

-- DropTable
DROP TABLE "StaffRegisQuestionScore";

-- DropTable
DROP TABLE "StudentAcademicQuestionAnswer";

-- DropTable
DROP TABLE "StudentFile";

-- DropTable
DROP TABLE "StudentInfo";

-- DropTable
DROP TABLE "StudentRegisQuestionAnswer";

-- CreateTable
CREATE TABLE "ApplicationInfo" (
    "std_application_id" TEXT NOT NULL,
    "std_info_prefix" TEXT,
    "std_info_first_name" TEXT,
    "std_info_last_name" TEXT,
    "std_info_nick_name" TEXT,
    "std_info_age" INTEGER,
    "std_info_birthdate" TEXT,
    "std_info_gender" TEXT,
    "std_info_religion" TEXT,
    "std_info_phone_number" TEXT,
    "std_info_education_level" TEXT,
    "std_info_education_institute" TEXT,
    "std_info_education_plan" TEXT,
    "std_info_parent_fullname" TEXT,
    "std_info_parent_relation" TEXT,
    "std_info_parent_phone_number" TEXT,
    "std_info_have_participated" BOOLEAN,
    "std_info_have_laptop" BOOLEAN,
    "std_info_can_participate_every_day" BOOLEAN,
    "std_info_medical_insurance" TEXT,
    "std_info_chronic_disease" TEXT,
    "std_info_drug_allergy" TEXT,
    "std_info_food_allergy" TEXT,
    "std_info_blood_group" TEXT,
    "std_info_address" TEXT,
    "std_info_shirt_size" TEXT,
    "std_info_travel_plan" TEXT,
    "std_info_laptop_os" TEXT,
    "std_info_have_tablet" BOOLEAN,
    "std_info_have_mouse" BOOLEAN,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApplicationInfo_pkey" PRIMARY KEY ("std_application_id")
);

-- CreateTable
CREATE TABLE "ApplicationFile" (
    "std_application_id" TEXT NOT NULL,
    "std_file_id" SERIAL NOT NULL,
    "std_file_originalname" TEXT NOT NULL,
    "std_file_mimetype" TEXT NOT NULL,
    "std_file_encoding" TEXT NOT NULL,
    "std_file_key" TEXT NOT NULL,
    "std_file_type" "FileType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApplicationFile_pkey" PRIMARY KEY ("std_application_id")
);

-- CreateTable
CREATE TABLE "ApplicationRegisQuestionScore" (
    "id" SERIAL NOT NULL,
    "std_regis_answer_id" INTEGER NOT NULL,
    "stf_count" INTEGER NOT NULL,
    "stf_score" DOUBLE PRECISION NOT NULL,
    "stf_user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApplicationRegisQuestionScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationRegisQuestionAnswer" (
    "std_application_id" TEXT NOT NULL,
    "std_regis_answer_id" SERIAL NOT NULL,
    "std_regis_answer_section" TEXT NOT NULL,
    "std_regis_answer" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApplicationRegisQuestionAnswer_pkey" PRIMARY KEY ("std_regis_answer_id")
);

-- CreateTable
CREATE TABLE "ApplicationAcademicQuestionScore" (
    "id" SERIAL NOT NULL,
    "std_academic_answer_id" INTEGER NOT NULL,
    "stf_count" INTEGER NOT NULL,
    "stf_score" DOUBLE PRECISION NOT NULL,
    "stf_user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApplicationAcademicQuestionScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationAcademicQuestionAnswer" (
    "std_application_id" TEXT NOT NULL,
    "std_academic_answer_id" SERIAL NOT NULL,
    "std_academic_answer_section" TEXT NOT NULL,
    "std_academic_answer" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApplicationAcademicQuestionAnswer_pkey" PRIMARY KEY ("std_academic_answer_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationFile_std_file_id_key" ON "ApplicationFile"("std_file_id");

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationFile_std_file_key_key" ON "ApplicationFile"("std_file_key");

-- AddForeignKey
ALTER TABLE "ApplicationInfo" ADD CONSTRAINT "ApplicationInfo_std_application_id_fkey" FOREIGN KEY ("std_application_id") REFERENCES "StudentApplication"("std_application_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationFile" ADD CONSTRAINT "ApplicationFile_std_application_id_fkey" FOREIGN KEY ("std_application_id") REFERENCES "StudentApplication"("std_application_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationRegisQuestionScore" ADD CONSTRAINT "ApplicationRegisQuestionScore_std_regis_answer_id_fkey" FOREIGN KEY ("std_regis_answer_id") REFERENCES "ApplicationRegisQuestionAnswer"("std_regis_answer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationRegisQuestionScore" ADD CONSTRAINT "ApplicationRegisQuestionScore_stf_user_id_fkey" FOREIGN KEY ("stf_user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationRegisQuestionAnswer" ADD CONSTRAINT "ApplicationRegisQuestionAnswer_std_application_id_fkey" FOREIGN KEY ("std_application_id") REFERENCES "StudentApplication"("std_application_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationAcademicQuestionScore" ADD CONSTRAINT "ApplicationAcademicQuestionScore_std_academic_answer_id_fkey" FOREIGN KEY ("std_academic_answer_id") REFERENCES "ApplicationAcademicQuestionAnswer"("std_academic_answer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationAcademicQuestionScore" ADD CONSTRAINT "ApplicationAcademicQuestionScore_stf_user_id_fkey" FOREIGN KEY ("stf_user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationAcademicQuestionAnswer" ADD CONSTRAINT "ApplicationAcademicQuestionAnswer_std_application_id_fkey" FOREIGN KEY ("std_application_id") REFERENCES "StudentApplication"("std_application_id") ON DELETE RESTRICT ON UPDATE CASCADE;
