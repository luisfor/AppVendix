-- AlterTable
ALTER TABLE "SubscriptionPlan" ADD COLUMN     "maxDataRetentionDays" INTEGER NOT NULL DEFAULT 365,
ADD COLUMN     "maxEmailsPerMonth" INTEGER NOT NULL DEFAULT 500,
ADD COLUMN     "maxStorageMb" INTEGER NOT NULL DEFAULT 1024,
ADD COLUMN     "maxVentasMensuales" INTEGER NOT NULL DEFAULT -1;

-- CreateTable
CREATE TABLE "CompanyUsage" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "emailsSent" INTEGER NOT NULL DEFAULT 0,
    "salesCount" INTEGER NOT NULL DEFAULT 0,
    "storageUsedMb" INTEGER NOT NULL DEFAULT 0,
    "currentCycleStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "currentCycleEnd" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyUsage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompanyUsage_companyId_key" ON "CompanyUsage"("companyId");

-- AddForeignKey
ALTER TABLE "CompanyUsage" ADD CONSTRAINT "CompanyUsage_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
