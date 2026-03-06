-- DropForeignKey
ALTER TABLE "Ticket" DROP CONSTRAINT "Ticket_stf_user_id_fkey";

-- AlterTable
ALTER TABLE "Ticket" ALTER COLUMN "stf_user_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_stf_user_id_fkey" FOREIGN KEY ("stf_user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
