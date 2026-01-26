-- AlterTable
ALTER TABLE "ApplicationFile" ALTER COLUMN "std_file_originalname" DROP NOT NULL,
ALTER COLUMN "std_file_mimetype" DROP NOT NULL,
ALTER COLUMN "std_file_encoding" DROP NOT NULL,
ALTER COLUMN "std_file_size" DROP NOT NULL;
