/*
  Warnings:

  - A unique constraint covering the columns `[hashed_file_name]` on the table `FileDetails` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FileDetails_hashed_file_name_key" ON "FileDetails"("hashed_file_name");
