/*
  Warnings:

  - The primary key for the `ApplicationPaymentEvidence` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `pe_id` on the `ApplicationPaymentEvidence` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pe_transaction_payload]` on the table `ApplicationPaymentEvidence` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pe_transaction_payload` to the `ApplicationPaymentEvidence` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ApplicationPaymentEvidence" DROP CONSTRAINT "ApplicationPaymentEvidence_pkey",
DROP COLUMN "pe_id",
ADD COLUMN     "pe_transaction_payload" TEXT NOT NULL,
ADD CONSTRAINT "ApplicationPaymentEvidence_pkey" PRIMARY KEY ("pe_transaction_ref");

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationPaymentEvidence_pe_transaction_payload_key" ON "ApplicationPaymentEvidence"("pe_transaction_payload");
