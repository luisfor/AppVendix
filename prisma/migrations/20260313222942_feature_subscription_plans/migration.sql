/*
  Warnings:

  - You are about to drop the column `price` on the `SubscriptionPlan` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `SubscriptionPlan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `monthlyPrice` to the `SubscriptionPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yearlyPrice` to the `SubscriptionPlan` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PlanStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'ARCHIVED');

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "SubscriptionPlan" DROP COLUMN "price",
ADD COLUMN     "allowCourtesy" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "code" TEXT,
ADD COLUMN     "isTrialEligible" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "maxBranches" INTEGER NOT NULL DEFAULT -1,
ADD COLUMN     "maxProducts" INTEGER NOT NULL DEFAULT -1,
ADD COLUMN     "maxUsers" INTEGER NOT NULL DEFAULT -1,
ADD COLUMN     "monthlyPrice" DECIMAL(12,2) NOT NULL,
ADD COLUMN     "status" "PlanStatus" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "yearlyPrice" DECIMAL(12,2) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "themePreference" TEXT NOT NULL DEFAULT 'dark';

-- CreateTable
CREATE TABLE "PlanPriceHistory" (
    "id" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "monthlyPrice" DECIMAL(12,2) NOT NULL,
    "yearlyPrice" DECIMAL(12,2) NOT NULL,
    "effectiveDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlanPriceHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SubscriptionPlan_code_key" ON "SubscriptionPlan"("code");

-- AddForeignKey
ALTER TABLE "PlanPriceHistory" ADD CONSTRAINT "PlanPriceHistory_planId_fkey" FOREIGN KEY ("planId") REFERENCES "SubscriptionPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
