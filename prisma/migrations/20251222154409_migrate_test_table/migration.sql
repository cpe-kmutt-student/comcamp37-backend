-- CreateTable
CREATE TABLE "Test" (
    "id" SERIAL NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_pass" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);
