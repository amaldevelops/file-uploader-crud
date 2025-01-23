/*
  Warnings:

  - Added the required column `Original_file_name` to the `FileDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hashed_file_name` to the `FileDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FileDetails" ADD COLUMN     "Original_file_name" TEXT NOT NULL,
ADD COLUMN     "date_saved" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "hashed_file_name" TEXT NOT NULL;
