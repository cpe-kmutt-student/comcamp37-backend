-- CreateTable
CREATE TABLE "ApplicationTotalScore" (
    "std_application_id" TEXT NOT NULL,
    "std_total_score" DOUBLE PRECISION NOT NULL,
    "std_regis_score" DOUBLE PRECISION NOT NULL,
    "std_academic_score" DOUBLE PRECISION NOT NULL,
    "std_academic_chaos_score" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApplicationTotalScore_pkey" PRIMARY KEY ("std_application_id")
);

-- AddForeignKey
ALTER TABLE "ApplicationTotalScore" ADD CONSTRAINT "ApplicationTotalScore_std_application_id_fkey" FOREIGN KEY ("std_application_id") REFERENCES "StudentApplication"("std_application_id") ON DELETE RESTRICT ON UPDATE CASCADE;
