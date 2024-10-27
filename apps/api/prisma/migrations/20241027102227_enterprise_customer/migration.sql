/*
  Warnings:

  - You are about to drop the `EntepriseCustomer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EntepriseCustomer" DROP CONSTRAINT "EntepriseCustomer_customerId_fkey";

-- DropForeignKey
ALTER TABLE "EntepriseCustomer" DROP CONSTRAINT "EntepriseCustomer_enterpriseId_fkey";

-- DropTable
DROP TABLE "EntepriseCustomer";

-- CreateTable
CREATE TABLE "EnterpriseCustomer" (
    "enterpriseId" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EnterpriseCustomer_pkey" PRIMARY KEY ("enterpriseId","customerId")
);

-- AddForeignKey
ALTER TABLE "EnterpriseCustomer" ADD CONSTRAINT "EnterpriseCustomer_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnterpriseCustomer" ADD CONSTRAINT "EnterpriseCustomer_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
