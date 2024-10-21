-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "creationDate" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "EntepriseCustomer" (
    "enterpriseId" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EntepriseCustomer_pkey" PRIMARY KEY ("enterpriseId","customerId")
);

-- AddForeignKey
ALTER TABLE "EntepriseCustomer" ADD CONSTRAINT "EntepriseCustomer_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntepriseCustomer" ADD CONSTRAINT "EntepriseCustomer_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
