/*
  Warnings:

  - The values [USER,ADMIN,STAFF] on the enum `UserRoles` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserRoles_new" AS ENUM ('user', 'admin', 'staff');
ALTER TABLE "public"."user" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "user" ALTER COLUMN "role" TYPE "UserRoles_new" USING ("role"::text::"UserRoles_new");
ALTER TYPE "UserRoles" RENAME TO "UserRoles_old";
ALTER TYPE "UserRoles_new" RENAME TO "UserRoles";
DROP TYPE "public"."UserRoles_old";
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'user';
COMMIT;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'user';
