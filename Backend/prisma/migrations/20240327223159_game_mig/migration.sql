-- AlterTable
ALTER TABLE "User" ADD COLUMN     "loses" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "wins" INTEGER NOT NULL DEFAULT 0;
