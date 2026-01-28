-- CreateEnum
CREATE TYPE "ApplicationResult" AS ENUM ('waiting_for_announcement', 'pass', 'reserve', 'fail');

-- AlterTable
ALTER TABLE "StudentApplication" ADD COLUMN     "std_application_result" "ApplicationResult" NOT NULL DEFAULT 'waiting_for_announcement';
