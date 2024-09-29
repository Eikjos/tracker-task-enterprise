/*
  Warnings:

  - You are about to drop the column `legalStatus` on the `Enterprise` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[juridicShapeId]` on the table `Enterprise` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `juridicShapeId` to the `Enterprise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Enterprise" DROP COLUMN "legalStatus",
ADD COLUMN     "juridicShapeId" TEXT NOT NULL;

-- DropEnum
DROP TYPE "LegalStatus";

-- CreateTable
CREATE TABLE "JuridicShape" (
    "code" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "designation" TEXT NOT NULL,

    CONSTRAINT "JuridicShape_pkey" PRIMARY KEY ("code")
);

-- CreateIndex
CREATE UNIQUE INDEX "Enterprise_juridicShapeId_key" ON "Enterprise"("juridicShapeId");

-- AddForeignKey
ALTER TABLE "Enterprise" ADD CONSTRAINT "Enterprise_juridicShapeId_fkey" FOREIGN KEY ("juridicShapeId") REFERENCES "JuridicShape"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
