import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const company = await prisma.company.findFirst();
    const module = await prisma.systemModule.findUnique({ where: { code: 'POS_BASIC' } });

    if (company && module) {
        await prisma.companyModule.upsert({
            where: { companyId_moduleId: { companyId: company.id, moduleId: module.id } },
            update: { enabled: true },
            create: { companyId: company.id, moduleId: module.id, enabled: true },
        });
        console.log(`Module POS_BASIC enabled for company: ${company.name}`);
    } else {
        console.log('Company or Module not found.');
    }
}

main().finally(() => prisma.$disconnect());
