import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const hash = await bcrypt.hash('Diosesamor120483+', 10);
    await prisma.user.upsert({
        where: { email: 'admin@pos-saas.com' },
        update: { password: hash, systemRole: 'SAAS_SUPER_ADMIN' },
        create: {
            email: 'admin@pos-saas.com',
            password: hash,
            name: 'Dueño SaaS',
            systemRole: 'SAAS_SUPER_ADMIN',
        }
    });
    console.log("Admin forced successfully!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
