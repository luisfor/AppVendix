-- CreateEnum
CREATE TYPE "SubscriptionState" AS ENUM ('ACTIVE', 'PENDING_DOWNGRADE', 'OVER_LIMIT', 'GRACE_PERIOD');

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "scheduledPlanId" TEXT,
ADD COLUMN     "subscriptionState" "SubscriptionState" NOT NULL DEFAULT 'ACTIVE';
