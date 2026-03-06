/*
  Warnings:

  - You are about to drop the column `std_application_id` on the `Ticket` table. All the data in the column will be lost.
  - You are about to drop the column `ticket_message` on the `Ticket` table. All the data in the column will be lost.
  - Added the required column `std_user_id` to the `Ticket` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ticket_system_message` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_std_application_id_fkey";

-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "std_application_id",
DROP COLUMN "ticket_message",
ADD COLUMN     "std_user_id" TEXT NOT NULL,
ADD COLUMN     "ticket_system_message" TEXT NOT NULL,
ADD COLUMN     "ticket_user_message" TEXT;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_std_user_id_fkey" FOREIGN KEY ("std_user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
