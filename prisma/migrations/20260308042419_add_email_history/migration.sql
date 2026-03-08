-- CreateTable
CREATE TABLE "StaffEmailHistory" (
    "email_id" TEXT NOT NULL,
    "email_message" TEXT NOT NULL,
    "email_to_email" TEXT NOT NULL,
    "email_to_name" TEXT NOT NULL,
    "email_has_sent" BOOLEAN NOT NULL DEFAULT false,
    "stf_user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StaffEmailHistory_pkey" PRIMARY KEY ("email_id")
);

-- AddForeignKey
ALTER TABLE "StaffEmailHistory" ADD CONSTRAINT "StaffEmailHistory_stf_user_id_fkey" FOREIGN KEY ("stf_user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
