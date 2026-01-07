/*
  Warnings:

  - The `role` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `StaffRoles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StaffUsers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StudentUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('USER', 'ADMIN', 'STAFF');

-- DropForeignKey
ALTER TABLE "StaffUsers" DROP CONSTRAINT "StaffUsers_stf_role_id_fkey";

-- DropForeignKey
ALTER TABLE "StudentFiles" DROP CONSTRAINT "StudentFiles_std_user_id_fkey";

-- DropForeignKey
ALTER TABLE "StudentInfo" DROP CONSTRAINT "StudentInfo_std_user_id_fkey";

-- DropForeignKey
ALTER TABLE "StudentQuestions" DROP CONSTRAINT "StudentQuestions_std_user_id_fkey";

-- DropForeignKey
ALTER TABLE "StudentStatus" DROP CONSTRAINT "StudentStatus_std_user_id_fkey";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "role",
ADD COLUMN     "role" "UserRoles" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "StaffRoles";

-- DropTable
DROP TABLE "StaffUsers";

-- DropTable
DROP TABLE "StudentUsers";

-- AddForeignKey
ALTER TABLE "StudentInfo" ADD CONSTRAINT "StudentInfo_std_user_id_fkey" FOREIGN KEY ("std_user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentFiles" ADD CONSTRAINT "StudentFiles_std_user_id_fkey" FOREIGN KEY ("std_user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentQuestions" ADD CONSTRAINT "StudentQuestions_std_user_id_fkey" FOREIGN KEY ("std_user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentStatus" ADD CONSTRAINT "StudentStatus_std_user_id_fkey" FOREIGN KEY ("std_user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
