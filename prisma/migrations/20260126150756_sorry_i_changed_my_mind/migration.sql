/*
  Warnings:

  - A unique constraint covering the columns `[std_user_id]` on the table `StudentApplication` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "StudentApplication_std_user_id_key" ON "StudentApplication"("std_user_id");
