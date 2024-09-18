-- CreateEnum
CREATE TYPE "LegalStatus" AS ENUM ('AUTO_ENTREPRENEUR', 'ENTREPRISE_INDIVIDUELLE', 'EIRL', 'SARL', 'SAS', 'SASU', 'SA', 'SCI', 'SNC', 'SCS', 'SCOP', 'ASSOCIATION', 'COOPERATIVE', 'GROUPMENT', 'EN_REGULARISATION', 'EN_CESSATION', 'EN_LIQUIDATION', 'EN_SUSPENSION', 'EN_FERMETURE');

-- CreateTable
CREATE TABLE "Enterprise" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "legalStatus" "LegalStatus" NOT NULL DEFAULT 'AUTO_ENTREPRENEUR',
    "siren" TEXT NOT NULL,
    "naf" TEXT NOT NULL,
    "TVANumber" TEXT NOT NULL,
    "RCSNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "creationDate" TIMESTAMP(3) NOT NULL,
    "managerId" INTEGER NOT NULL,

    CONSTRAINT "Enterprise_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Enterprise_managerId_key" ON "Enterprise"("managerId");

-- AddForeignKey
ALTER TABLE "Enterprise" ADD CONSTRAINT "Enterprise_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
