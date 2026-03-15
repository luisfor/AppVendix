import { PrismaClient, CompanyStatus } from '@prisma/client';
const prisma = new PrismaClient();

async function runTest() {
    console.log("Setting up test data...");

    // Cleanup first in case previous runs failed
    await prisma.company.deleteMany({
        where: { email: { in: ["expired@test.com", "warning@test.com"] } }
    });

    // Create a company that expires YESTERDAY
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const expiredCompany = await prisma.company.create({
        data: {
            name: "Expired Test Co",
            email: "expired@test.com",
            status: CompanyStatus.ACTIVE,
            subscriptionEndsAt: yesterday
        }
    });

    // Create a company that expires in EXACTLY 3 DAYS
    const threeDays = new Date();
    threeDays.setDate(threeDays.getDate() + 3);
    threeDays.setHours(threeDays.getHours() + 1); // Ensure it falls strictly inside the 3-4 days window

    const warningCompany = await prisma.company.create({
        data: {
            name: "Warning Test Co",
            email: "warning@test.com",
            status: CompanyStatus.ACTIVE,
            subscriptionEndsAt: threeDays
        }
    });

    console.log("Created test companies. Calling the cron endpoint logic locally...");

    // Simulate the exact API Route Logic
    const { GET } = await import('../src/app/api/cron/check-subscriptions/route');

    // Create a Mock Request
    const mockRequest = new Request('http://localhost:3000/api/cron/check-subscriptions');

    const response = await GET(mockRequest);
    const json = await response.json();

    console.log("\nCron Job Results:", json);

    // Verify
    const updatedExpired = await prisma.company.findUnique({ where: { id: expiredCompany.id } });
    console.log(`\nVerification: Expired Company status is now -> ${updatedExpired?.status}`);

    // Cleanup
    await prisma.company.deleteMany({
        where: { id: { in: [expiredCompany.id, warningCompany.id] } }
    });
    console.log("Test data cleaned up.");
}

runTest().catch(console.error).finally(() => prisma.$disconnect());
