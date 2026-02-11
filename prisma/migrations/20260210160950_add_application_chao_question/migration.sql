-- CreateTable
CREATE TABLE "ApplicationAcademicChaosQuestionScore" (
    "id" SERIAL NOT NULL,
    "std_academic_answer_id" INTEGER NOT NULL,
    "stf_count" INTEGER NOT NULL,
    "stf_score" DOUBLE PRECISION NOT NULL,
    "stf_user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApplicationAcademicChaosQuestionScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationAcademicChaosQuestionAnswer" (
    "std_application_id" TEXT NOT NULL,
    "std_academic_answer_id" SERIAL NOT NULL,
    "std_academic_answer_section" TEXT NOT NULL,
    "std_academic_answer" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApplicationAcademicChaosQuestionAnswer_pkey" PRIMARY KEY ("std_academic_answer_id")
);

-- AddForeignKey
ALTER TABLE "ApplicationAcademicChaosQuestionScore" ADD CONSTRAINT "ApplicationAcademicChaosQuestionScore_std_academic_answer__fkey" FOREIGN KEY ("std_academic_answer_id") REFERENCES "ApplicationAcademicChaosQuestionAnswer"("std_academic_answer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationAcademicChaosQuestionScore" ADD CONSTRAINT "ApplicationAcademicChaosQuestionScore_stf_user_id_fkey" FOREIGN KEY ("stf_user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationAcademicChaosQuestionAnswer" ADD CONSTRAINT "ApplicationAcademicChaosQuestionAnswer_std_application_id_fkey" FOREIGN KEY ("std_application_id") REFERENCES "StudentApplication"("std_application_id") ON DELETE RESTRICT ON UPDATE CASCADE;
