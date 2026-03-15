import 'dotenv/config';
import { PrismaClient, CompanyStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log("Creando datos de prueba de facturación...");

    // Limpiar usuarios de prueba anteriores
    await prisma.company.deleteMany({
        where: { email: { in: ['billing-test@pos-saas.com', 'expired-test@pos-saas.com'] } }
    });

    const hashedPassword = await bcrypt.hash('Diosesamor120483+', 10);

    // Empresa Pronta a vencer (Trial)
    const soon = new Date();
    soon.setDate(soon.getDate() + 5);

    await prisma.company.create({
        data: {
            name: 'Empresa Expira Pronto',
            email: 'billing-test@pos-saas.com',
            status: CompanyStatus.ACTIVE,
            subscriptionEndsAt: soon,
            users: {
                create: {
                    name: 'Admin Expira Pronto',
                    email: 'billing-test@pos-saas.com',
                    password: hashedPassword,
                    systemRole: 'COMPANY_ADMIN',
                }
            }
        }
    });
    console.log("- Creada OBT Empresa con 5 días restantes: billing-test@pos-saas.com");

    const past = new Date();
    past.setDate(past.getDate() - 2);

    // Empresa Suspendida / Vencida
    await prisma.company.create({
        data: {
            name: 'Empresa Morosa SA',
            email: 'expired-test@pos-saas.com',
            status: CompanyStatus.SUSPENDED,
            subscriptionEndsAt: past,
            users: {
                create: {
                    name: 'Admin Moroso',
                    email: 'expired-test@pos-saas.com',
                    password: hashedPassword,
                    systemRole: 'COMPANY_ADMIN',
                }
            }
        }
    });
    console.log("- Creada Empresa MOROSA: expired-test@pos-saas.com");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        console.log("¡Hecho! Listo para probar ingresando a la app web.");
    });
