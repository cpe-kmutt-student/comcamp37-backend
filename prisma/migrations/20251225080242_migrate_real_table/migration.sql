-- CreateTable
CREATE TABLE "StudentUsers" (
    "std_user_id" TEXT NOT NULL,
    "std_user_nick_name" TEXT NOT NULL,
    "std_user_first_name" TEXT NOT NULL,
    "std_user_last_name" TEXT NOT NULL,
    "std_user_email" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentUsers_pkey" PRIMARY KEY ("std_user_id")
);

-- CreateTable
CREATE TABLE "StudentInfo" (
    "std_user_id" TEXT NOT NULL,
    "std_info_age" INTEGER NOT NULL,
    "std_info_gender" TEXT NOT NULL,
    "std_info_religion" TEXT NOT NULL,
    "std_info_blood_group" TEXT NOT NULL,
    "std_info_education_level" TEXT NOT NULL,
    "std_info_education_plan" TEXT NOT NULL,
    "std_info_phone" TEXT NOT NULL,
    "std_info_alternative_email" TEXT NOT NULL,
    "std_info_medical_insurance" TEXT NOT NULL,
    "std_info_chronic_disease" TEXT NOT NULL,
    "std_info_drug_allergy" TEXT NOT NULL,
    "std_info_food_allergy" TEXT NOT NULL,
    "std_info_address" TEXT NOT NULL,
    "std_info_home_phone" TEXT NOT NULL,
    "std_info_have_participated" BOOLEAN NOT NULL,
    "std_info_shirt_size" TEXT NOT NULL,
    "std_info_have_laptop" BOOLEAN NOT NULL,
    "std_info_travel_plan" TEXT NOT NULL,
    "std_info_parent_name" TEXT NOT NULL,
    "std_info_parent_relation" TEXT NOT NULL,
    "std_info_parent_phone" TEXT NOT NULL,
    "std_info_food_prefer" TEXT NOT NULL,
    "std_info_can_participate_every_day" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentInfo_pkey" PRIMARY KEY ("std_user_id")
);

-- CreateTable
CREATE TABLE "StudentFiles" (
    "std_user_id" TEXT NOT NULL,
    "std_file_face" TEXT NOT NULL,
    "std_file_national_id" TEXT NOT NULL,
    "std_file_parent_permission" TEXT NOT NULL,
    "std_file_pp_1" TEXT NOT NULL,
    "std_file_pp_7" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentFiles_pkey" PRIMARY KEY ("std_user_id")
);

-- CreateTable
CREATE TABLE "StudentQuestions" (
    "std_user_id" TEXT NOT NULL,
    "std_q_1" TEXT NOT NULL,
    "std_q_2" TEXT NOT NULL,
    "std_q_3" TEXT NOT NULL,
    "std_q_4" TEXT NOT NULL,
    "std_q_5" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentQuestions_pkey" PRIMARY KEY ("std_user_id")
);

-- CreateTable
CREATE TABLE "StudentStatus" (
    "std_user_id" TEXT NOT NULL,
    "std_status_file_done" BOOLEAN NOT NULL DEFAULT false,
    "std_status_info_done" BOOLEAN NOT NULL DEFAULT false,
    "std_status_question_done" BOOLEAN NOT NULL DEFAULT false,
    "stf_info_checked" BOOLEAN NOT NULL DEFAULT false,
    "stf_q_checked" BOOLEAN NOT NULL DEFAULT false,
    "std_q_result" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentStatus_pkey" PRIMARY KEY ("std_user_id")
);

-- CreateTable
CREATE TABLE "StaffUsers" (
    "stf_user_uuid" TEXT NOT NULL,
    "stf_role_id" INTEGER NOT NULL,
    "stf_user_name" TEXT NOT NULL,
    "stf_user_email" TEXT NOT NULL,
    "stf_user_password" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StaffUsers_pkey" PRIMARY KEY ("stf_user_uuid")
);

-- CreateTable
CREATE TABLE "StaffRoles" (
    "stf_role_id" SERIAL NOT NULL,
    "stf_role_name" TEXT NOT NULL,
    "stf_role_weight" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StaffRoles_pkey" PRIMARY KEY ("stf_role_id")
);

-- AddForeignKey
ALTER TABLE "StudentInfo" ADD CONSTRAINT "StudentInfo_std_user_id_fkey" FOREIGN KEY ("std_user_id") REFERENCES "StudentUsers"("std_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentFiles" ADD CONSTRAINT "StudentFiles_std_user_id_fkey" FOREIGN KEY ("std_user_id") REFERENCES "StudentUsers"("std_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentQuestions" ADD CONSTRAINT "StudentQuestions_std_user_id_fkey" FOREIGN KEY ("std_user_id") REFERENCES "StudentUsers"("std_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentStatus" ADD CONSTRAINT "StudentStatus_std_user_id_fkey" FOREIGN KEY ("std_user_id") REFERENCES "StudentUsers"("std_user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StaffUsers" ADD CONSTRAINT "StaffUsers_stf_role_id_fkey" FOREIGN KEY ("stf_role_id") REFERENCES "StaffRoles"("stf_role_id") ON DELETE RESTRICT ON UPDATE CASCADE;
