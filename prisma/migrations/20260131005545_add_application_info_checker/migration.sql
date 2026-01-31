/*
  Warnings:

  - You are about to drop the column `stf_info_checked` on the `ApplicationStatus` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "AppInfoStatus" AS ENUM ('info_approve', 'info_reject', 'info_waiting');

-- AlterTable
ALTER TABLE "ApplicationStatus" DROP COLUMN "stf_info_checked";

-- CreateTable
CREATE TABLE "ApplicationInfoCheck" (
    "std_application_id" TEXT NOT NULL,
    "stf_user_id" TEXT NOT NULL,
    "std_info_status" "AppInfoStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApplicationInfoCheck_pkey" PRIMARY KEY ("std_application_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationInfoCheck_stf_user_id_key" ON "ApplicationInfoCheck"("stf_user_id");

-- AddForeignKey
ALTER TABLE "ApplicationInfoCheck" ADD CONSTRAINT "ApplicationInfoCheck_std_application_id_fkey" FOREIGN KEY ("std_application_id") REFERENCES "ApplicationStatus"("std_application_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationInfoCheck" ADD CONSTRAINT "ApplicationInfoCheck_stf_user_id_fkey" FOREIGN KEY ("stf_user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
