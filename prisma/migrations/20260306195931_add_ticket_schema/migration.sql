-- CreateTable
CREATE TABLE "Ticket" (
    "std_application_id" TEXT NOT NULL,
    "ticket_id" TEXT NOT NULL,
    "ticket_message" TEXT,
    "ticket_solved" BOOLEAN NOT NULL DEFAULT false,
    "stf_user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("ticket_id")
);

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_std_application_id_fkey" FOREIGN KEY ("std_application_id") REFERENCES "StudentApplication"("std_application_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_stf_user_id_fkey" FOREIGN KEY ("stf_user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
