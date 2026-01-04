/*
  Warnings:

  - A unique constraint covering the columns `[stf_user_email]` on the table `StaffUsers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[std_user_email]` on the table `StudentUsers` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "StudentFiles" ALTER COLUMN "std_file_face" DROP NOT NULL,
ALTER COLUMN "std_file_national_id" DROP NOT NULL,
ALTER COLUMN "std_file_parent_permission" DROP NOT NULL,
ALTER COLUMN "std_file_pp_1" DROP NOT NULL,
ALTER COLUMN "std_file_pp_7" DROP NOT NULL;

-- AlterTable
ALTER TABLE "StudentInfo" ALTER COLUMN "std_info_age" DROP NOT NULL,
ALTER COLUMN "std_info_gender" DROP NOT NULL,
ALTER COLUMN "std_info_religion" DROP NOT NULL,
ALTER COLUMN "std_info_blood_group" DROP NOT NULL,
ALTER COLUMN "std_info_education_level" DROP NOT NULL,
ALTER COLUMN "std_info_education_plan" DROP NOT NULL,
ALTER COLUMN "std_info_phone" DROP NOT NULL,
ALTER COLUMN "std_info_alternative_email" DROP NOT NULL,
ALTER COLUMN "std_info_medical_insurance" DROP NOT NULL,
ALTER COLUMN "std_info_chronic_disease" DROP NOT NULL,
ALTER COLUMN "std_info_drug_allergy" DROP NOT NULL,
ALTER COLUMN "std_info_food_allergy" DROP NOT NULL,
ALTER COLUMN "std_info_address" DROP NOT NULL,
ALTER COLUMN "std_info_home_phone" DROP NOT NULL,
ALTER COLUMN "std_info_have_participated" DROP NOT NULL,
ALTER COLUMN "std_info_shirt_size" DROP NOT NULL,
ALTER COLUMN "std_info_have_laptop" DROP NOT NULL,
ALTER COLUMN "std_info_travel_plan" DROP NOT NULL,
ALTER COLUMN "std_info_parent_name" DROP NOT NULL,
ALTER COLUMN "std_info_parent_relation" DROP NOT NULL,
ALTER COLUMN "std_info_parent_phone" DROP NOT NULL,
ALTER COLUMN "std_info_food_prefer" DROP NOT NULL,
ALTER COLUMN "std_info_can_participate_every_day" DROP NOT NULL,
ALTER COLUMN "std_user_first_name" DROP NOT NULL,
ALTER COLUMN "std_user_last_name" DROP NOT NULL,
ALTER COLUMN "std_user_nick_name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "StudentQuestions" ALTER COLUMN "std_q_1" DROP NOT NULL,
ALTER COLUMN "std_q_2" DROP NOT NULL,
ALTER COLUMN "std_q_3" DROP NOT NULL,
ALTER COLUMN "std_q_4" DROP NOT NULL,
ALTER COLUMN "std_q_5" DROP NOT NULL;

-- AlterTable
ALTER TABLE "StudentStatus" ALTER COLUMN "std_status_file_done" DROP NOT NULL,
ALTER COLUMN "std_status_info_done" DROP NOT NULL,
ALTER COLUMN "std_status_question_done" DROP NOT NULL,
ALTER COLUMN "stf_info_checked" DROP NOT NULL,
ALTER COLUMN "stf_q_checked" DROP NOT NULL,
ALTER COLUMN "std_q_result" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "StaffUsers_stf_user_email_key" ON "StaffUsers"("stf_user_email");

-- CreateIndex
CREATE UNIQUE INDEX "StudentUsers_std_user_email_key" ON "StudentUsers"("std_user_email");
