/*
  Warnings:

  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Test";

-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL,
    "user_name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FileDetails" (
    "id" INTEGER NOT NULL,
    "file_url" TEXT NOT NULL,
    "file_size" TEXT NOT NULL,
    "folder_name" TEXT NOT NULL,

    CONSTRAINT "FileDetails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_id_key" ON "Users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FileDetails_id_key" ON "FileDetails"("id");
