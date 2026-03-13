import { SaaSManagementService } from './saas-management.ts';
import prisma from '../prisma.ts';
import { CompanyStatus } from '@prisma/client';

export async function testSaaSFlow() {
    console.log('--- Iniciando Prueba de Flujo SaaS ---');

    try {
        // 1. Crear nueva empresa cliente (como Super Admin)
        const result = await SaaSManagementService.createClientCompany({
            name: 'Farmacia Salud y Vida',
            email: 'contacto@saludvida.com',
            planName: 'Plan Profesional',
            adminUser: {
                name: 'Administrador Farmacia',
                email: 'admin@saludvida.com',
                password: 'secure_password_123'
            }
        });

        console.log(`✅ Empresa creada: ${result.company.name} (Plan Pro)`);
        console.log(`✅ Usuario admin creado: ${result.adminUser.email}`);

        // 2. Verificar módulos habilitados
        const modules = await prisma.companyModule.findMany({
            where: { companyId: result.company.id },
            include: { module: true }
        });
        console.log('📦 Módulos habilitados:', modules.map(m => m.module.code).join(', '));

        // 3. Probar suspensión de empresa
        await SaaSManagementService.updateCompanyStatus(result.company.id, CompanyStatus.SUSPENDED);
        console.log('🚫 Empresa suspendida exitosamente');

        // 4. Verificar métricas globales
        const metrics = await SaaSManagementService.getGlobalUsageMetrics();
        console.log('📊 Métricas Globales:', metrics);

        console.log('✨ PRUEBA SaaS EXITOSA');

    } catch (error) {
        console.error('❌ Error en la prueba SaaS:', error);
    }
}
