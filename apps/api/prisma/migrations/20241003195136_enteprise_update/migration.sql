/*
  Warnings:

  - You are about to drop the column `RCSNumber` on the `Enterprise` table. All the data in the column will be lost.
  - You are about to drop the column `naf` on the `Enterprise` table. All the data in the column will be lost.
  - Added the required column `siret` to the `Enterprise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Enterprise" DROP COLUMN "RCSNumber",
DROP COLUMN "naf",
ADD COLUMN     "siret" TEXT NOT NULL;
