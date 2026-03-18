-- CreateTable
CREATE TABLE "ApplicationPaymentEvidence" (
    "pe_id" TEXT NOT NULL,
    "pe_transaction_ref" TEXT NOT NULL,
    "pe_transaction_date" TIMESTAMP(3) NOT NULL,
    "pe_transaction_expect_amount" DOUBLE PRECISION NOT NULL DEFAULT 500.00,
    "pe_transaction_actual_amount" DOUBLE PRECISION NOT NULL,
    "pe_json" TEXT NOT NULL,
    "pe_sender_account_name" TEXT NOT NULL,
    "pe_sender_account_number" TEXT NOT NULL,
    "pe_sender_bank_id" TEXT NOT NULL,
    "pe_sender_bank_name" TEXT NOT NULL,
    "pe_reciever_account_name" TEXT NOT NULL,
    "pe_reciever_account_number" TEXT NOT NULL,
    "pe_reciever_bank_id" TEXT NOT NULL,
    "pe_reciever_bank_name" TEXT NOT NULL,
    "std_file_key" TEXT NOT NULL,
    "std_application_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApplicationPaymentEvidence_pkey" PRIMARY KEY ("pe_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationPaymentEvidence_std_file_key_key" ON "ApplicationPaymentEvidence"("std_file_key");

-- AddForeignKey
ALTER TABLE "ApplicationPaymentEvidence" ADD CONSTRAINT "ApplicationPaymentEvidence_std_file_key_fkey" FOREIGN KEY ("std_file_key") REFERENCES "ApplicationFile"("std_file_key") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationPaymentEvidence" ADD CONSTRAINT "ApplicationPaymentEvidence_std_application_id_fkey" FOREIGN KEY ("std_application_id") REFERENCES "StudentApplication"("std_application_id") ON DELETE RESTRICT ON UPDATE CASCADE;
