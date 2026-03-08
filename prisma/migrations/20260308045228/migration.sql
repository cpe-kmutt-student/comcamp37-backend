/*
  Warnings:

  - You are about to drop the column `email_message` on the `StaffEmailHistory` table. All the data in the column will be lost.
  - Added the required column `email_content` to the `StaffEmailHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email_subject` to the `StaffEmailHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StaffEmailHistory" DROP COLUMN "email_message",
ADD COLUMN     "email_content" TEXT NOT NULL,
ADD COLUMN     "email_subject" TEXT NOT NULL;
